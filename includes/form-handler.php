<?php
/**
 * Form submission listener – Crescent Hill Publishers
 * Parses POST, validates, resolves IP/geo server-side (no CORS), saves to DB, sends email.
 * Include this from sendmail.php (or any endpoint) and call process_inquiry_submission($con).
 */

if (!defined('CREEKHILL_FORM_HANDLER_LOADED')) {
    define('CREEKHILL_FORM_HANDLER_LOADED', true);
}

@include_once __DIR__ . '/mail-config.php';
@include_once __DIR__ . '/smtp-mail.php';

/**
 * Ensure the default inquiries table exists on first live run.
 * No-op when table already exists or account has no CREATE privilege.
 */
function form_handler_ensure_inquiries_table($con, $table) {
    if (!$con || !$table) return false;
    $table_safe = preg_replace('/[^a-zA-Z0-9_]/', '', (string) $table);
    if ($table_safe === '') return false;
    $sql = "CREATE TABLE IF NOT EXISTS `{$table_safe}` (
        `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(255) NULL,
        `email` VARCHAR(255) NULL,
        `phone` VARCHAR(64) NULL,
        `message` TEXT NULL,
        `ip_address` VARCHAR(64) NULL,
        `country` VARCHAR(128) NULL,
        `country_code` VARCHAR(8) NULL,
        `region` VARCHAR(128) NULL,
        `city` VARCHAR(128) NULL,
        `user_agent` TEXT NULL,
        `referrer_url` TEXT NULL,
        `landing_page` TEXT NULL,
        `form_source` VARCHAR(128) NULL,
        `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        KEY `idx_email` (`email`),
        KEY `idx_created_at` (`created_at`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    return (bool) @mysqli_query($con, $sql);
}

/**
 * Get client IP (supports proxy/Cloudflare).
 */
function form_handler_get_ip() {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
        $ip = trim($ips[0]);
    }
    if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
        $ip = $_SERVER['HTTP_CF_CONNECTING_IP'];
    }
    return $ip;
}

/**
 * Fetch geo + ISP from ip-api.com (country, region, city, isp, org). Server-side, no key required.
 * Returns array with keys: country, country_code, region, state, city, isp, org or null on failure.
 */
function form_handler_ip_info_ipapi($ip) {
    if (!filter_var($ip, FILTER_VALIDATE_IP)) {
        return null;
    }
    $url = 'http://ip-api.com/json/' . $ip . '?fields=status,country,countryCode,regionName,city,isp,org';
    $ctx = stream_context_create(['http' => ['timeout' => 4]]);
    $raw = @file_get_contents($url, false, $ctx);
    $j = $raw ? @json_decode($raw) : null;
    if (!$j || empty($j->status) || $j->status !== 'success') {
        return null;
    }
    return [
        'country'      => isset($j->country) ? trim((string) $j->country) : '',
        'country_code' => isset($j->countryCode) ? trim((string) $j->countryCode) : '',
        'region'       => isset($j->regionName) ? trim((string) $j->regionName) : '',
        'state'        => isset($j->regionName) ? trim((string) $j->regionName) : '',
        'city'         => isset($j->city) ? trim((string) $j->city) : '',
        'isp'          => isset($j->isp) ? trim((string) $j->isp) : '',
        'org'          => isset($j->org) ? trim((string) $j->org) : '',
    ];
}


function form_handler_ip_info($ip = null, $purpose = 'location', $deep_detect = true) {
    if (filter_var($ip, FILTER_VALIDATE_IP) === false) {
        $ip = $_SERVER['REMOTE_ADDR'] ?? '';
        if ($deep_detect) {
            if (filter_var(@$_SERVER['HTTP_X_FORWARDED_FOR'], FILTER_VALIDATE_IP))
                $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
            if (filter_var(@$_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP))
                $ip = $_SERVER['HTTP_CLIENT_IP'];
        }
    }
    $purpose = str_replace(['name', "\n", "\t", " ", "-", "_"], '', strtolower(trim($purpose)));
    $support = ['country', 'countrycode', 'state', 'region', 'city', 'location', 'address'];

    if (!filter_var($ip, FILTER_VALIDATE_IP) || !in_array($purpose, $support)) {
        return null;
    }

    $location = form_handler_ip_info_ipapi($ip);
    if ($location && ($location['country'] !== '' || $location['city'] !== '')) {
        $location['ip'] = $ip;
        if ($purpose === 'location') {
            return $location;
        }
        if ($purpose === 'city') return $location['city'];
        if ($purpose === 'state' || $purpose === 'region') return $location['region'];
        if ($purpose === 'country') return $location['country'];
        if ($purpose === 'countrycode') return $location['country_code'];
        if ($purpose === 'address') {
            $a = array_filter([$location['city'], $location['region'], $location['country']]);
            return implode(', ', array_reverse($a));
        }
        return $location;
    }

    $continents = [
        'AF' => 'Africa', 'AN' => 'Antarctica', 'AS' => 'Asia',
        'EU' => 'Europe', 'OC' => 'Australia (Oceania)', 'NA' => 'North America', 'SA' => 'South America'
    ];
    $url = 'http://www.geoplugin.net/json.gp?ip=' . $ip;
    $ctx = stream_context_create(['http' => ['timeout' => 3]]);
    $raw = @file_get_contents($url, false, $ctx);
    $ipdat = $raw ? @json_decode($raw) : null;
    if ($ipdat && @strlen(trim($ipdat->geoplugin_countryCode ?? '')) == 2) {
        $output = null;
        switch ($purpose) {
            case 'location':
                $output = [
                    'city' => @$ipdat->geoplugin_city,
                    'state' => @$ipdat->geoplugin_regionName,
                    'region' => @$ipdat->geoplugin_regionName,
                    'country' => @$ipdat->geoplugin_countryName,
                    'country_code' => @$ipdat->geoplugin_countryCode,
                    'continent' => @$continents[strtoupper($ipdat->geoplugin_continentCode ?? '')],
                    'continent_code' => @$ipdat->geoplugin_continentCode,
                    'ip' => $ip,
                    'isp' => '',
                    'org' => ''
                ];
                break;
            case 'address':
                $address = [$ipdat->geoplugin_countryName ?? ''];
                if (@strlen($ipdat->geoplugin_regionName ?? '') >= 1) $address[] = $ipdat->geoplugin_regionName;
                if (@strlen($ipdat->geoplugin_city ?? '') >= 1) $address[] = $ipdat->geoplugin_city;
                $output = implode(', ', array_reverse($address));
                break;
            case 'city':   $output = @$ipdat->geoplugin_city; break;
            case 'state':
            case 'region': $output = @$ipdat->geoplugin_regionName; break;
            case 'country': $output = @$ipdat->geoplugin_countryName; break;
            case 'countrycode': $output = @$ipdat->geoplugin_countryCode; break;
        }
        return $output;
    }
    return $location;
}

/**
 * Process inquiry form submission: parse POST, validate, geo (server-side), save DB, send email.
 * @param mysqli $con Database connection
 * @return array ['status' => 1|0, 'message' => string, 'ajax' => bool] or ['invalid' => true] when no valid POST
 */
function process_inquiry_submission($con) {
    $is_ajax = false;
    $data = [];
    $form_source = 'contact';

    if (isset($_POST['quote']) && is_array($_POST['quote'])) {
        $is_ajax = true;
        $data['name']  = isset($_POST['quote']['name'])  ? trim($_POST['quote']['name'])  : '';
        $data['email'] = isset($_POST['quote']['email']) ? trim($_POST['quote']['email']) : '';
        $data['phone'] = isset($_POST['quote']['phone']) ? trim($_POST['quote']['phone']) : '';
        $data['message'] = isset($_POST['quote']['message']) ? trim($_POST['quote']['message']) : '';
        $data['lead_url'] = isset($_POST['quote']['lead_url']) ? $_POST['quote']['lead_url'] : '';
        $form_source = !empty($_POST['form_source']) ? trim($_POST['form_source']) : 'home_quote';
    } elseif (!empty($_POST['name']) || !empty($_POST['email'])) {
        $data['name']    = isset($_POST['name']) ? trim($_POST['name']) : '';
        $data['email']   = isset($_POST['email']) ? trim($_POST['email']) : '';
        $data['phone']   = isset($_POST['phone_number']) ? trim($_POST['phone_number']) : (isset($_POST['phone']) ? trim($_POST['phone']) : '');
        $data['message'] = isset($_POST['message']) ? trim($_POST['message']) : '';
        $data['package_name'] = isset($_POST['package_name']) ? trim($_POST['package_name']) : '';
        if (!empty($_POST['first_name']) || !empty($_POST['last_name'])) {
            $full = trim(trim($_POST['first_name'] ?? '') . ' ' . trim($_POST['last_name'] ?? ''));
            if ($full !== '') {
                $data['name'] = $full;
            }
        }
        if (!empty($_POST['service'])) {
            $service = trim((string) $_POST['service']);
            if ($data['package_name'] === '') {
                $data['package_name'] = $service;
            }
            if ($data['message'] === '') {
                $data['message'] = 'Service: ' . $service;
            }
        }
        if ($data['phone'] === '' && $data['message'] !== '' && preg_match('/^[\d\s\-+()]{7,25}$/', $data['message'])) {
            $data['phone'] = $data['message'];
            $data['message'] = '';
        }
        $form_source = !empty($_POST['form_source']) ? trim($_POST['form_source']) : (isset($_POST['package_name']) ? 'modal_50off' : 'contact');
    } elseif (!empty($_POST['cn']) || !empty($_POST['em'])) {
        // Landing page form (lp-book-publishing): cn, em, pn, msg
        $data['name']    = isset($_POST['cn']) ? trim($_POST['cn']) : '';
        $data['email']   = isset($_POST['em']) ? trim($_POST['em']) : '';
        $data['phone']   = isset($_POST['pn']) ? trim($_POST['pn']) : '';
        $data['message'] = isset($_POST['msg']) ? trim($_POST['msg']) : '';
        $form_source = !empty($_POST['form_source']) ? trim($_POST['form_source']) : 'lp-book-publishing';
    } else {
        return ['invalid' => true];
    }

    if (empty($data['email'])) {
        return [
            'status' => 0,
            'message' => 'Email is required',
            'ajax' => $is_ajax
        ];
    }

    $ip = form_handler_get_ip();
    $location = form_handler_ip_info($ip);

    $data['ip']           = !empty($_POST['ip2loc_ip']) ? trim($_POST['ip2loc_ip']) : $ip;
    $data['country']      = !empty($_POST['ip2loc_country']) ? trim($_POST['ip2loc_country']) : (is_array($location) ? ($location['country'] ?? '') : '');
    $data['country_code'] = is_array($location) ? ($location['country_code'] ?? '') : '';
    $data['region']       = !empty($_POST['ip2loc_region']) ? trim($_POST['ip2loc_region']) : (is_array($location) ? ($location['state'] ?? $location['region'] ?? '') : '');
    $data['city']         = !empty($_POST['ip2loc_city']) ? trim($_POST['ip2loc_city']) : (is_array($location) ? ($location['city'] ?? '') : '');
    $data['isp']          = !empty($_POST['ip2loc_isp']) ? trim($_POST['ip2loc_isp']) : (is_array($location) ? ($location['isp'] ?? '') : '');
    $data['org']          = !empty($_POST['ip2loc_org']) ? trim($_POST['ip2loc_org']) : (is_array($location) ? ($location['org'] ?? '') : '');
    $data['user_agent']   = $_SERVER['HTTP_USER_AGENT'] ?? '';
    $data['referrer_url'] = !empty($_POST['referrer_url']) ? trim($_POST['referrer_url']) : ($_SERVER['HTTP_REFERER'] ?? '');
    $data['landing_page'] = !empty($_POST['landing_page']) ? trim($_POST['landing_page']) : ($data['lead_url'] ?? ($_SERVER['HTTP_REFERER'] ?? ''));
    if (!isset($data['package_name'])) {
        $data['package_name'] = isset($_POST['package_name']) ? trim($_POST['package_name']) : '';
    }
    $data['lead_amount']  = isset($_POST['lead_amount']) ? trim($_POST['lead_amount']) : null;
    $data['campaign_name']   = isset($_POST['campaign_name']) ? trim($_POST['campaign_name']) : '';
    $data['campaign_email']  = isset($_POST['campaign_email']) ? trim($_POST['campaign_email']) : '';
    $data['source']          = isset($_POST['source']) ? trim($_POST['source']) : '';
    $data['campaign_category']  = isset($_POST['campaign_category']) ? trim($_POST['campaign_category']) : '';
    $data['campaign_country']   = isset($_POST['campaign_country']) ? trim($_POST['campaign_country']) : '';
    $data['campaign_phone']     = isset($_POST['campaign_phone']) ? trim($_POST['campaign_phone']) : '';
    $data['campaign_offer']     = isset($_POST['campaign_offer']) ? trim($_POST['campaign_offer']) : '';

    // Sanitize phone fields: digits and + only (no letters or other characters)
    $data['phone'] = preg_replace('/[^\d+]/', '', $data['phone']);
    $data['campaign_phone'] = preg_replace('/[^\d+]/', '', $data['campaign_phone']);

    $admin_email = defined('FORM_ADMIN_EMAIL') ? FORM_ADMIN_EMAIL : 'info@acebookpublishers.com';
    $site_name   = defined('FORM_SITE_NAME') ? FORM_SITE_NAME : 'Ace Book Publishers';
    $from_email  = defined('FORM_FROM_EMAIL') ? FORM_FROM_EMAIL : 'form@acebookpublishers.com';
    $subject     = $site_name . ' – New Inquiry #' . date('Ymd-His');

    ob_start();
    include __DIR__ . '/email-template.php';
    $message = ob_get_clean();

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . $site_name . " <" . $from_email . ">\r\n";
    $reply_to = filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL);
    if ($reply_to) {
        $headers .= "Reply-To: " . $reply_to . "\r\n";
    }

    $saved = false;
    $db_error = '';
    if (defined('DB_CONNECTION_ERROR')) {
        $db_error = 'DB connection: ' . DB_CONNECTION_ERROR;
    }
    $inquiry_table = defined('INQUIRY_TABLE') ? preg_replace('/[^a-zA-Z0-9_]/', '', INQUIRY_TABLE) : 'inquiries';
    if ($inquiry_table === '') {
        $inquiry_table = 'inquiries';
    }
    $table_candidates = [];
    foreach ([$inquiry_table, 'inquiries', 'inquiry', 'form'] as $t) {
        $t = preg_replace('/[^a-zA-Z0-9_]/', '', (string) $t);
        if ($t !== '' && !in_array($t, $table_candidates, true)) {
            $table_candidates[] = $t;
        }
    }
    $has_lead_amt = ($data['lead_amount'] !== null && $data['lead_amount'] !== '');
    $lead_amt_val = $has_lead_amt ? (string) $data['lead_amount'] : null;

    if ($con && !mysqli_connect_errno()) {
        foreach ($table_candidates as $table_name) {
            if ($saved) break;
            if ($has_lead_amt) {
                $inquiries_sql = "INSERT INTO `{$table_name}` (name, email, phone, message, ip_address, country, country_code, region, city, user_agent, referrer_url, landing_page, form_source, isp, org, package_name, lead_amount, campaign_name, campaign_email, source, campaign_category, campaign_country, campaign_phone, campaign_offer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                $stmt = @mysqli_prepare($con, $inquiries_sql);
                if ($stmt) {
                    $bind_types = str_repeat('s', 24);
                    $saved = mysqli_stmt_bind_param($stmt, $bind_types,
                        $data['name'], $data['email'], $data['phone'], $data['message'],
                        $data['ip'], $data['country'], $data['country_code'], $data['region'], $data['city'],
                        $data['user_agent'], $data['referrer_url'], $data['landing_page'], $form_source,
                        $data['isp'], $data['org'],
                        $data['package_name'], $lead_amt_val, $data['campaign_name'], $data['campaign_email'],
                        $data['source'], $data['campaign_category'], $data['campaign_country'], $data['campaign_phone'], $data['campaign_offer']
                    ) && mysqli_stmt_execute($stmt);
                    if (!$saved && $con) $db_error = mysqli_error($con);
                    mysqli_stmt_close($stmt);
                } else {
                    if ($con) $db_error = mysqli_error($con);
                }
            } else {
                $inquiries_sql_no_lead = "INSERT INTO `{$table_name}` (name, email, phone, message, ip_address, country, country_code, region, city, user_agent, referrer_url, landing_page, form_source, isp, org, package_name, campaign_name, campaign_email, source, campaign_category, campaign_country, campaign_phone, campaign_offer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                $stmt = @mysqli_prepare($con, $inquiries_sql_no_lead);
                if ($stmt) {
                    $bind_types = str_repeat('s', 23);
                    $saved = mysqli_stmt_bind_param($stmt, $bind_types,
                        $data['name'], $data['email'], $data['phone'], $data['message'],
                        $data['ip'], $data['country'], $data['country_code'], $data['region'], $data['city'],
                        $data['user_agent'], $data['referrer_url'], $data['landing_page'], $form_source,
                        $data['isp'], $data['org'],
                        $data['package_name'], $data['campaign_name'], $data['campaign_email'],
                        $data['source'], $data['campaign_category'], $data['campaign_country'], $data['campaign_phone'], $data['campaign_offer']
                    ) && mysqli_stmt_execute($stmt);
                    if (!$saved && $con) $db_error = mysqli_error($con);
                    mysqli_stmt_close($stmt);
                } else {
                    if ($con) $db_error = mysqli_error($con);
                }
            }
            if (!$saved) {
                $inquiries_sql2 = "INSERT INTO `{$table_name}` (name, email, phone, message, ip_address, country, country_code, region, city, user_agent, referrer_url, landing_page, form_source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                $stmt2 = @mysqli_prepare($con, $inquiries_sql2);
                if ($stmt2) {
                    mysqli_stmt_bind_param($stmt2, 'sssssssssssss',
                        $data['name'], $data['email'], $data['phone'], $data['message'],
                        $data['ip'], $data['country'], $data['country_code'], $data['region'], $data['city'],
                        $data['user_agent'], $data['referrer_url'], $data['landing_page'], $form_source
                    );
                    $saved = mysqli_stmt_execute($stmt2);
                    if (!$saved && $con) $db_error = mysqli_error($con);
                    mysqli_stmt_close($stmt2);
                }
            }
        }
        if (!$saved) {
            // Try to create the default table once, then retry minimal insert.
            if (form_handler_ensure_inquiries_table($con, $inquiry_table)) {
                $retry_sql = "INSERT INTO `{$inquiry_table}` (name, email, phone, message, ip_address, country, country_code, region, city, user_agent, referrer_url, landing_page, form_source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                $retry_stmt = @mysqli_prepare($con, $retry_sql);
                if ($retry_stmt) {
                    mysqli_stmt_bind_param($retry_stmt, 'sssssssssssss',
                        $data['name'], $data['email'], $data['phone'], $data['message'],
                        $data['ip'], $data['country'], $data['country_code'], $data['region'], $data['city'],
                        $data['user_agent'], $data['referrer_url'], $data['landing_page'], $form_source
                    );
                    $saved = mysqli_stmt_execute($retry_stmt);
                    if (!$saved && $con) $db_error = mysqli_error($con);
                    mysqli_stmt_close($retry_stmt);
                }
            }
        }
        if (!$saved) {
            $form_data = addslashes(serialize($data));
            $legacy_sql = "INSERT INTO form (email, form_data, status) VALUES ('" . mysqli_real_escape_string($con, $data['email']) . "', '" . $form_data . "', 1)";
            if (@mysqli_query($con, $legacy_sql)) {
                $saved = true;
            }
        }
    }

    $mail_error = '';
    $mail_sent = false;
    if (defined('MAIL_USE_SMTP') && MAIL_USE_SMTP && function_exists('send_mail_smtp')) {
        $result = @send_mail_smtp($admin_email, $subject, $message, $headers);
        $mail_sent = is_array($result) ? $result['success'] : (bool) $result;
        if (!$mail_sent && is_array($result) && !empty($result['error'])) {
            $mail_error = $result['error'];
        }
    }
    if (!$mail_sent) {
        $mail_sent = @mail($admin_email, $subject, $message, $headers);
    }

    // If the inquiry was saved to DB, treat as success so the user gets thank-you page; leads are never lost
    $user_success = $saved || $mail_sent;
    $fail_message = "Unable to send. Please try again or contact us by phone.";
    if ($mail_error !== '') {
        $fail_message .= ' (' . $mail_error . ')';
    }
    if ($db_error !== '' && $fail_message !== '') {
        $fail_message .= ' [DB: ' . $db_error . ']';
    } elseif ($db_error !== '') {
        $fail_message = 'Data not saved. ' . $db_error;
    }
    $result = [
        'status' => $user_success ? 1 : 0,
        'message' => $user_success ? "Thank you! We'll get back to you soon." : $fail_message,
        'ajax' => $is_ajax
    ];
    // Always include debug on failure so you can see the reason in Network tab (e.g. DB or SMTP error)
    if (!$user_success || (defined('FORM_DEBUG') && FORM_DEBUG)) {
        $result['debug'] = [
            'saved' => $saved,
            'mail_sent' => $mail_sent,
            'db_error' => $db_error !== '' ? $db_error : null,
            'mail_error' => $mail_error !== '' ? $mail_error : null,
        ];
    }
    return $result;
}

<?php

/**
 * Inquiry API – Crescent Hill Publishers SPA + legacy HTML forms.
 * POST JSON or application/x-www-form-urlencoded to save `inquiries` and send notification email.
 */
declare(strict_types=1);

/**
 * Directory that contains the `includes/` folder. When this file is served as `/api/sendmail.php`,
 * `__DIR__` is `.../api` but `includes/` lives one level up — without this, requires fail and the API returns 500.
 */
function sendmail_includes_root(): string {
    $dir = __DIR__;
    return basename($dir) === 'api' ? dirname($dir) : $dir;
}

/**
 * @return list<string>
 */
function sendmail_collect_cors_origins(): array {
    $out = [];
    if (function_exists('getenv') && getenv('CORS_ALLOWED_ORIGINS')) {
        foreach (explode(',', (string) getenv('CORS_ALLOWED_ORIGINS')) as $o) {
            $o = trim($o);
            if ($o !== '') {
                $out[] = $o;
            }
        }
    }
    if ($out === [] && defined('CORS_ALLOWED_ORIGINS') && is_string(CORS_ALLOWED_ORIGINS)) {
        foreach (explode(',', CORS_ALLOWED_ORIGINS) as $o) {
            $o = trim($o);
            if ($o !== '') {
                $out[] = $o;
            }
        }
    }
    if ($out === []) {
        $out = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'http://localhost:8080',
            'http://127.0.0.1:8080',
            'http://[::1]:8080',
            'https://acebookpublishers.com',
            'http://acebookpublishers.com',
            'https://www.acebookpublishers.com',
            'http://www.acebookpublishers.com',
            'http://acebookpublishers.test',
            'https://acebookpublishers.test',
        ];
    }
    return $out;
}

/** Allow CORS for explicit list or Vite dev on LAN (e.g. http://10.3.25.58:5173). */
function sendmail_cors_origin_allowed(string $origin): bool {
    if ($origin === '') {
        return false;
    }
    if (in_array($origin, sendmail_collect_cors_origins(), true)) {
        return true;
    }
    $pattern = '#^http://('
        . 'localhost|127\.0\.0\.1|'
        . '10\.\d{1,3}\.\d{1,3}\.\d{1,3}|'
        . '192\.168\.\d{1,3}\.\d{1,3}|'
        . '172\.(1[6-9]|2[0-9]|3[01])\.\d{1,3}\.\d{1,3}'
        . '):(5173|5174|8080)$#';
    return (bool) preg_match($pattern, $origin);
}

// Load mail config before CORS so CORS_ALLOWED_ORIGINS from mail-config.local.php / env applies.
$sendmailRoot = sendmail_includes_root();
try {
    require_once $sendmailRoot . '/includes/mail-config.php';
} catch (Throwable $e) {
    error_log('[crescenthill sendmail mail-config] ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine());
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowCors = sendmail_cors_origin_allowed($origin);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    if ($allowCors) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Access-Control-Allow-Credentials: true');
    }
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
    header('Access-Control-Max-Age: 86400');
    http_response_code(204);
    exit;
}

header('Content-Type: application/json; charset=UTF-8');
if ($allowCors) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Access-Control-Allow-Credentials: true');
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 0, 'message' => 'Method not allowed']);
    exit;
}

$contentType = $_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? '';
$raw = file_get_contents('php://input');

if ($raw !== '' && stripos($contentType, 'application/json') !== false) {
    $j = json_decode($raw, true);
    if (json_last_error() !== JSON_ERROR_NONE || !is_array($j)) {
        http_response_code(400);
        echo json_encode(['status' => 0, 'message' => 'Invalid JSON']);
        exit;
    }
    if (isset($j['quote']) && is_array($j['quote'])) {
        $_POST['quote'] = $j['quote'];
        unset($j['quote']);
    }
    foreach ($j as $k => $v) {
        if (is_string($v) || is_numeric($v)) {
            $_POST[$k] = $v;
        }
    }
    if (!defined('INQUIRY_JSON_REQUEST')) {
        define('INQUIRY_JSON_REQUEST', true);
    }
}

try {
    require_once $sendmailRoot . '/includes/connection.php';
    require_once $sendmailRoot . '/includes/form-handler.php';
} catch (Throwable $e) {
    error_log('[crescenthill sendmail load] ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine());
    http_response_code(500);
    echo json_encode([
        'status' => 0,
        'message' => 'Something went wrong while sending your message. Please try again or contact us by phone or email.',
    ]);
    exit;
}

try {
    $result = process_inquiry_submission($con);
} catch (Throwable $e) {
    error_log('[crescenthill sendmail process] ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine());
    http_response_code(500);
    echo json_encode([
        'status' => 0,
        'message' => 'Something went wrong while sending your message. Please try again or contact us by phone or email.',
    ]);
    exit;
}

if (isset($result['invalid'])) {
    http_response_code(400);
    echo json_encode(['status' => 0, 'message' => 'Invalid request — missing required fields']);
    exit;
}

$body = [
    'status' => (int) $result['status'],
    'message' => $result['message'],
];
if (!empty($result['debug'])) {
    $body['debug'] = $result['debug'];
}
echo json_encode($body);

<?php
/**
 * Mail configuration – Crescent Hill Publishers.
 * Override in includes/config.php (DB + SMTP). Hostname selects sensible defaults when constants are unset.
 */
if (file_exists(__DIR__ . '/config.php')) {
    require_once __DIR__ . '/config.php';
}

$host = isset($_SERVER['HTTP_HOST']) ? strtolower((string) $_SERVER['HTTP_HOST']) : '';
$is_capital_bm = $host !== '' && strpos($host, 'acebookpublishers.com') !== false;
$is_crescent_live = $host !== '' && preg_match('/(^|\.)acebookpublishers\.com$/', $host) === 1;
$is_crescent_local = $host !== '' && stripos($host, 'acebookpublishers') !== false;
$is_production = $is_crescent_live || $is_capital_bm;

// SITE_URL: production host, Laragon .test, or local dev
if (!defined('SITE_URL')) {
    if ($is_crescent_live) {
        $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        $h = preg_replace('/:\d+$/', '', (string) ($_SERVER['HTTP_HOST'] ?? 'acebookpublishers.com'));
        define('SITE_URL', $scheme . '://' . $h);
    } elseif ($is_crescent_local && $host !== '') {
        $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        define('SITE_URL', $scheme . '://' . $_SERVER['HTTP_HOST']);
    } elseif ($is_capital_bm) {
        define('SITE_URL', 'https://acebookpublishers.com');
    } else {
        define('SITE_URL', 'http://localhost:5173');
    }
}

// Optional logo in notification email (add /logo.png to site root or set FORM_LOGO_URL in config.php)
if (!defined('FORM_LOGO_URL')) {
    define('FORM_LOGO_URL', '');
}

$default_admin = $is_capital_bm ? 'info@acebookpublishers.com' : 'info@acebookpublishers.com';
$default_site_name = 'Ace Book Publishers';
$default_from = $is_capital_bm
    ? ($is_production ? 'info@acebookpublishers.com' : 'form@acebookpublishers.com')
    : ($is_production ? 'info@acebookpublishers.com' : 'form@acebookpublishers.com');

if (!defined('FORM_ADMIN_EMAIL')) {
    define('FORM_ADMIN_EMAIL', $default_admin);
}
if (!defined('FORM_SITE_NAME')) {
    define('FORM_SITE_NAME', $default_site_name);
}
if (!defined('FORM_FROM_EMAIL')) {
    define('FORM_FROM_EMAIL', $default_from);
}

// SMTP: production = credentials from config.php when set; else local Mailtrap
if (!defined('MAIL_USE_SMTP')) {
    define('MAIL_USE_SMTP', true);
}
if (MAIL_USE_SMTP) {
    if ($is_production && defined('MAIL_HOST') && defined('MAIL_USERNAME') && defined('MAIL_PASSWORD')) {
        if (!defined('MAIL_FROM_ADDRESS')) {
            define('MAIL_FROM_ADDRESS', FORM_FROM_EMAIL);
        }
        if (!defined('MAIL_FROM_NAME')) {
            define('MAIL_FROM_NAME', FORM_SITE_NAME);
        }
    } else {
        if (!defined('MAIL_HOST')) {
            define('MAIL_HOST', 'sandbox.smtp.mailtrap.io');
        }
        if (!defined('MAIL_PORT')) {
            define('MAIL_PORT', 2525);
        }
        if (!defined('MAIL_USERNAME')) {
            define('MAIL_USERNAME', 'your_mailtrap_username');
        }
        if (!defined('MAIL_PASSWORD')) {
            define('MAIL_PASSWORD', 'your_mailtrap_password');
        }
        if (!defined('MAIL_ENCRYPTION')) {
            define('MAIL_ENCRYPTION', '');
        }
        if (!defined('MAIL_FROM_ADDRESS')) {
            define('MAIL_FROM_ADDRESS', FORM_FROM_EMAIL);
        }
        if (!defined('MAIL_FROM_NAME')) {
            define('MAIL_FROM_NAME', FORM_SITE_NAME);
        }
    }
}

<?php
/**
 * Database connection. Create includes/config.php from config.example.php to set DB_HOST, DB_USER, DB_PASS, DB_NAME.
 */
if (file_exists(__DIR__ . '/config.php')) {
    require_once __DIR__ . '/config.php';
}
$db_host = defined('DB_HOST') ? DB_HOST : 'localhost';
$db_user = defined('DB_USER') ? DB_USER : 'root';
$db_pass = defined('DB_PASS') ? DB_PASS : '';
$db_name = defined('DB_NAME') ? DB_NAME : 'acebookpublishers';

mysqli_report(MYSQLI_REPORT_OFF);
$con = null;
/**
 * Shared-host MySQL hostnames differ by account; try common local fallbacks.
 * We keep DB_HOST first so configured host always has highest priority.
 */
$host_candidates = [];
foreach ([$db_host, 'localhost', '127.0.0.1'] as $h) {
    if (!is_string($h) || $h === '') continue;
    if (!in_array($h, $host_candidates, true)) {
        $host_candidates[] = $h;
    }
}

$last_error = '';
foreach ($host_candidates as $candidate) {
    try {
        $tmp = @mysqli_connect($candidate, $db_user, $db_pass, $db_name);
    } catch (Throwable $e) {
        $tmp = null;
        $last_error = $e->getMessage();
    }
    if ($tmp && !mysqli_connect_errno()) {
        $con = $tmp;
        @mysqli_set_charset($con, 'utf8mb4');
        break;
    }
    $last_error = mysqli_connect_error() ?: $last_error;
    $con = null;
}

if (!$con) {
    if (!defined('DB_CONNECTION_ERROR')) {
        define('DB_CONNECTION_ERROR', $last_error !== '' ? $last_error : 'Unable to connect to database');
    }
}

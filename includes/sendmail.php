<?php
/**
 * Legacy path: forwards to the site-root inquiry API (JSON + form POST).
 * Prefer POST to /api/sendmail.php or /sendmail.php at site root (see Vite proxy + dist copy).
 */
declare(strict_types=1);
require_once dirname(__DIR__) . '/sendmail.php';

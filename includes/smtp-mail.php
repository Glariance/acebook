<?php
/**
 * Send email via SMTP (e.g. Mailtrap). No Composer required.
 * Requires includes/mail-config.php to be loaded with MAIL_USE_SMTP and SMTP credentials.
 *
 * @param string $to Recipient address
 * @param string $subject Subject line
 * @param string $body HTML or text body
 * @param string $headers Optional raw headers (e.g. "MIME-Version: 1.0\r\nContent-Type: text/html...\r\nReply-To: ...")
 * @return array ['success' => bool, 'error' => string] so caller can show why it failed
 */
function send_mail_smtp($to, $subject, $body, $headers = '') {
    $fail = function ($msg) { return ['success' => false, 'error' => $msg]; };
    $ok = function () { return ['success' => true, 'error' => '']; };

    if (!defined('MAIL_USE_SMTP') || !MAIL_USE_SMTP || !defined('MAIL_HOST') || !MAIL_HOST || !defined('MAIL_PORT') || !MAIL_PORT) {
        return $fail('SMTP not configured');
    }
    $host = MAIL_HOST;
    $port = (int) MAIL_PORT;
    $user = defined('MAIL_USERNAME') ? MAIL_USERNAME : '';
    $pass = defined('MAIL_PASSWORD') ? MAIL_PASSWORD : '';
    $from_addr = defined('MAIL_FROM_ADDRESS') ? MAIL_FROM_ADDRESS : 'noreply@localhost';
    $from_name = defined('MAIL_FROM_NAME') ? MAIL_FROM_NAME : '';
    $encryption = defined('MAIL_ENCRYPTION') ? strtolower((string) MAIL_ENCRYPTION) : '';

    $errno = 0;
    $errstr = '';
    $scheme = ($encryption === 'ssl') ? 'ssl' : 'tcp';
    $target = $scheme . '://' . $host . ':' . $port;
    $ctx = stream_context_create([
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
        ]
    ]);
    $fp = @stream_socket_client($target, $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $ctx);
    if (!$fp) {
        return $fail('SMTP connection failed: ' . ($errstr ?: "errno $errno"));
    }

    $read = function () use ($fp) {
        $line = @fgets($fp, 515);
        return $line !== false ? trim($line) : '';
    };
    $send = function ($line) use ($fp) {
        return @fwrite($fp, $line . "\r\n") !== false;
    };
    $readOk = function ($expected = null) use ($read) {
        $line = $read();
        $code = substr($line, 0, 3);
        $ok = (int) $code >= 200 && (int) $code < 400;
        if ($expected !== null && $expected !== '') {
            if (strlen($expected) >= 3) {
                $ok = ($code === substr($expected, 0, 3));
            } else {
                $ok = (substr($code, 0, 1) === substr($expected, 0, 1));
            }
        }
        return ['ok' => $ok, 'line' => $line];
    };

    $r = $readOk('2');
    if (!$r['ok']) {
        fclose($fp);
        return $fail('SMTP banner: ' . $r['line']);
    }

    $send('EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'));
    // Consume full EHLO response: continuation lines are "250-xxx", final line is "250 xxx" (space after code)
    while (true) {
        $line = $read();
        if ($line === '') break;
        if (strlen($line) >= 4 && substr($line, 0, 3) === '250' && $line[3] === ' ') break;
    }

    if ($user !== '' && $pass !== '') {
        $send('AUTH LOGIN');
        $r = $readOk('3');
        if (!$r['ok']) {
            fclose($fp);
            return $fail('SMTP auth (user): ' . $r['line']);
        }
        $send(base64_encode($user));
        $r = $readOk('3');
        if (!$r['ok']) {
            fclose($fp);
            return $fail('SMTP auth (pass): ' . $r['line']);
        }
        $send(base64_encode($pass));
        $r = $readOk('235');
        if (!$r['ok']) {
            fclose($fp);
            return $fail('SMTP auth failed: ' . $r['line']);
        }
    }

    $send('MAIL FROM:<' . $from_addr . '>');
    $r = $readOk('2');
    if (!$r['ok']) {
        fclose($fp);
        return $fail('SMTP MAIL FROM: ' . $r['line']);
    }
    $send('RCPT TO:<' . $to . '>');
    $r = $readOk('2');
    if (!$r['ok']) {
        fclose($fp);
        return $fail('SMTP RCPT TO: ' . $r['line']);
    }
    $send('DATA');
    $r = $readOk('3');
    if (!$r['ok']) {
        fclose($fp);
        return $fail('SMTP DATA: ' . $r['line']);
    }

    $full_headers = "To: " . $to . "\r\n";
    $full_headers .= "Subject: " . $subject . "\r\n";
    if (trim($headers) !== '' && stripos($headers, 'From:') !== false) {
        $full_headers .= $headers;
    } else {
        if ($from_name) {
            $full_headers .= "From: " . $from_name . " <" . $from_addr . ">\r\n";
        } else {
            $full_headers .= "From: " . $from_addr . "\r\n";
        }
        $full_headers .= $headers;
    }
    $full_headers = str_replace(["\r\n\r\n", "\n\n"], "\r\n", trim($full_headers));
    if (substr($full_headers, -2) !== "\r\n") {
        $full_headers .= "\r\n";
    }
    $message = $full_headers . "\r\n" . $body;
    $message = preg_replace('/\r?\n/', "\r\n", $message);
    $message = preg_replace('/^\.(?!\.)/m', '..', $message);
    $send($message);
    $send('.');

    $r = $readOk('2');
    $send('QUIT');
    fclose($fp);

    if (!$r['ok']) {
        return $fail('SMTP send: ' . $r['line']);
    }
    return $ok();
}

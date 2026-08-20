<?php
/**
 * Admin login hashes for Inquiry Details dashboard.
 *
 * Generate replacement hashes from terminal:
 * php -r "echo password_hash(strtolower(trim('your-new-email@example.com')), PASSWORD_DEFAULT), PHP_EOL;"
 * php -r "echo password_hash('YourNewStrongPassword', PASSWORD_DEFAULT), PHP_EOL;"
 *
 * Then replace the constants below with the new hash output.
 */

define('INQUIRY_ADMIN_EMAIL_HASH', '$2y$10$9HKi/MyBFgNC8J7c/n5JTOj6jJK.vUyN1ieUTbrA22cTm6rZU2Wv2');
define('INQUIRY_ADMIN_PASSWORD_HASH', '$2y$10$HI2.FQSNCYvpnoFc6.n9PeGZQNuP0Yy0VsaN6AP0WzZ7z6R3gxX9S');

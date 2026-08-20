<?php
declare(strict_types=1);

session_start();

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Accept');
    http_response_code(204);
    exit;
}

$includesRoot = basename(__DIR__) === 'api' ? dirname(__DIR__) : __DIR__;
require_once $includesRoot . '/includes/inquiry-admin-auth.php';

function inquiry_json_input(): array
{
    $raw = file_get_contents('php://input');
    if (!is_string($raw) || trim($raw) === '') {
        return [];
    }
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function inquiry_admin_authed(): bool
{
    return !empty($_SESSION['inquiry_admin_auth']) && $_SESSION['inquiry_admin_auth'] === true;
}

function inquiry_admin_require_auth(): void
{
    if (!inquiry_admin_authed()) {
        http_response_code(401);
        echo json_encode(['status' => 0, 'message' => 'Unauthorized']);
        exit;
    }
}

function inquiry_admin_table_name(): string
{
    $table = defined('INQUIRY_TABLE') ? preg_replace('/[^a-zA-Z0-9_]/', '', INQUIRY_TABLE) : 'inquiries';
    return $table !== '' ? $table : 'inquiries';
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$action = isset($_GET['action']) ? trim((string) $_GET['action']) : '';

if ($method === 'POST' && $action === 'login') {
    $payload = inquiry_json_input();
    $email = strtolower(trim((string) ($payload['email'] ?? '')));
    $password = (string) ($payload['password'] ?? '');

    $validEmail = $email !== '' && password_verify($email, INQUIRY_ADMIN_EMAIL_HASH);
    $validPassword = $password !== '' && password_verify($password, INQUIRY_ADMIN_PASSWORD_HASH);

    if (!$validEmail || !$validPassword) {
        http_response_code(401);
        echo json_encode(['status' => 0, 'message' => 'Invalid email or password']);
        exit;
    }

    session_regenerate_id(true);
    $_SESSION['inquiry_admin_auth'] = true;

    echo json_encode(['status' => 1, 'message' => 'Login successful']);
    exit;
}

if ($method === 'POST' && $action === 'logout') {
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
    }
    session_destroy();
    echo json_encode(['status' => 1, 'message' => 'Logged out']);
    exit;
}

if ($method === 'GET' && $action === 'session') {
    echo json_encode(['status' => inquiry_admin_authed() ? 1 : 0]);
    exit;
}

inquiry_admin_require_auth();
require_once $includesRoot . '/includes/connection.php';

if (!$con || mysqli_connect_errno()) {
    http_response_code(500);
    echo json_encode(['status' => 0, 'message' => 'Database connection failed']);
    exit;
}

$table = inquiry_admin_table_name();

if ($method === 'GET' && $action === 'list') {
    $sql = "SELECT id, name, email, phone, form_source, created_at FROM `{$table}` ORDER BY id DESC LIMIT 200";
    $result = @mysqli_query($con, $sql);
    if (!$result) {
        http_response_code(500);
        echo json_encode(['status' => 0, 'message' => 'Failed to fetch inquiries']);
        exit;
    }

    $rows = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $rows[] = $row;
    }
    mysqli_free_result($result);
    echo json_encode(['status' => 1, 'data' => $rows]);
    exit;
}

if ($method === 'GET' && $action === 'detail') {
    $id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(['status' => 0, 'message' => 'Invalid inquiry id']);
        exit;
    }

    $sql = "SELECT * FROM `{$table}` WHERE id = ? LIMIT 1";
    $stmt = mysqli_prepare($con, $sql);
    if (!$stmt) {
        http_response_code(500);
        echo json_encode(['status' => 0, 'message' => 'Failed to prepare query']);
        exit;
    }
    mysqli_stmt_bind_param($stmt, 'i', $id);
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);
    $row = $res ? mysqli_fetch_assoc($res) : null;
    if ($res) {
        mysqli_free_result($res);
    }
    mysqli_stmt_close($stmt);

    if (!$row) {
        http_response_code(404);
        echo json_encode(['status' => 0, 'message' => 'Inquiry not found']);
        exit;
    }

    echo json_encode(['status' => 1, 'data' => $row]);
    exit;
}

http_response_code(400);
echo json_encode(['status' => 0, 'message' => 'Invalid action']);

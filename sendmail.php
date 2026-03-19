<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require __DIR__ . '/vendor/autoload.php';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
    exit;
}

header("Content-Type: application/json; charset=utf-8");

$raw = file_get_contents("php://input");
$data = json_decode($raw);

if (!$data || !isset($data->email, $data->name, $data->message)) {
    http_response_code(400);
    echo json_encode([
        "success" => false,
        "error" => "Ungültige Daten",
        "raw" => $raw
    ]);
    exit;
}

$mail = new PHPMailer(true);

try {
    $smtpPass = getenv('BREVO_SMTP_PASS');

    if (!$smtpPass) {
        throw new Exception('BREVO_SMTP_PASS ist leer oder nicht gesetzt');
    }

    $mail->isSMTP();
    $mail->Host       = 'smtp-relay.brevo.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'a57820001@smtp-brevo.com';
    $mail->Password   = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Debug aktivieren
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->Debugoutput = function($str, $level) {
        error_log("PHPMailer [$level]: $str");
    };

    $mail->CharSet = 'UTF-8';

    $mail->setFrom('kontakt@ferchow-eugen.de', 'Website Kontakt');
    $mail->addAddress('kontakt@ferchow-eugen.de');
    $mail->addReplyTo($data->email, $data->name);

    $mail->isHTML(true);
    $mail->Subject = 'Kontaktformular';

    $mail->Body = "
        <strong>Name:</strong> " . htmlspecialchars($data->name) . "<br><br>
        <strong>Email:</strong> " . htmlspecialchars($data->email) . "<br><br>
        <strong>Nachricht:</strong><br>" .
        nl2br(htmlspecialchars($data->message));

    $mail->AltBody =
        "Name: " . $data->name . "\n\n" .
        "Email: " . $data->email . "\n\n" .
        "Nachricht:\n" . $data->message;

    $mail->send();

    echo json_encode(["success" => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => $mail->ErrorInfo ?: $e->getMessage()
    ]);
}
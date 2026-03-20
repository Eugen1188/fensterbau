<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    require __DIR__ . '/vendor/autoload.php';
    $config = require '/var/www/config/mail-config.php';

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode([
            "success" => false,
            "error" => "Method not allowed"
        ]);
        exit;
    }

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

    $smtpPass = $config['brevo_smtp_pass'] ?? '';
    if (empty($smtpPass)) {
        throw new Exception('brevo_smtp_pass ist leer oder nicht gesetzt');
    }

    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp-relay.brevo.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'a57820001@smtp-brevo.com';
    $mail->Password = $smtpPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;
    $mail->CharSet = 'UTF-8';
    $mail->Timeout = 20;

    $mail->setFrom('kontakt@ferchow-eugen.de', 'Website Kontakt');
    $mail->addAddress('kontakt@ferchow-eugen.de');
    $mail->addReplyTo($data->email, $data->name);

    $safeName = htmlspecialchars($data->name, ENT_QUOTES, 'UTF-8');
    $safeEmail = htmlspecialchars($data->email, ENT_QUOTES, 'UTF-8');
    $safeMessage = nl2br(htmlspecialchars($data->message, ENT_QUOTES, 'UTF-8'));

    $mail->isHTML(true);
    $mail->Subject = 'Kontaktformular';
    $mail->Body = "
        <strong>Name:</strong> {$safeName}<br><br>
        <strong>Email:</strong> {$safeEmail}<br><br>
        <strong>Nachricht:</strong><br>{$safeMessage}
    ";
    $mail->AltBody =
        "Name: {$data->name}\n\n" .
        "Email: {$data->email}\n\n" .
        "Nachricht:\n{$data->message}";

    $mail->send();

    echo json_encode([
        "success" => true,
        "message" => "Mail erfolgreich gesendet"
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage(),
        "mailError" => isset($mail) ? $mail->ErrorInfo : null
    ]);
}
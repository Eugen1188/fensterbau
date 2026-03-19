<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

header("Content-Type: application/json; charset=utf-8");

$data = json_decode(file_get_contents("php://input"));

if (!$data || !isset($data->email, $data->name, $data->message)) {
    http_response_code(400);
    echo json_encode(["success" => false]);
    exit;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp-relay.brevo.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'a57820001@smtp-brevo.com';
    $mail->Password   = 'rTmcvQCyWJL6Fg78'; // NICHT hardcoden!
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom('kontakt@ferchow-eugen.de', 'Website Kontakt');
    $mail->addAddress('kontakt@ferchow-eugen.de');

    $mail->addReplyTo($data->email, $data->name);

    $mail->isHTML(true);
    $mail->Subject = "Kontaktformular";

    $mail->Body = "
        <strong>Name:</strong> " . htmlspecialchars($data->name) . "<br><br>
        <strong>Email:</strong> " . htmlspecialchars($data->email) . "<br><br>
        <strong>Nachricht:</strong><br>
        " . nl2br(htmlspecialchars($data->message));

    $mail->send();

    echo json_encode(["success" => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => $mail->ErrorInfo
    ]);
}
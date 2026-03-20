<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Content-Type: application/json; charset=utf-8");

try {
    require __DIR__ . '/vendor/autoload.php';
    $config = require __DIR__ . '/mail-config.php';

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

    $mail->setFrom('kontakt@ferchow-eugen.de', 'Website Kontakt');
    $mail->addAddress('kontakt@ferchow-eugen.de');
    $mail->Subject = 'SMTP-Test';
    $mail->Body = 'Testmail vom Server';

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
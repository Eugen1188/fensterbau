<?php

switch ($_SERVER['REQUEST_METHOD']) {
    case 'OPTIONS':
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type");
        http_response_code(200);
        exit;

    case 'POST':
        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=utf-8");

        $json = file_get_contents('php://input');
        $params = json_decode($json);

        if (!$params || !isset($params->email, $params->name, $params->message)) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Ungültige Anfrage"]);
            exit;
        }

        $email = filter_var(trim($params->email), FILTER_VALIDATE_EMAIL);
        $name = trim($params->name);
        $messageText = trim($params->message);

        if (!$email || $name === '' || $messageText === '') {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "Bitte alle Felder korrekt ausfüllen"]);
            exit;
        }

        $recipient = 'kontakt@ferchow-eugen.de';
        $subject = "Kontaktformular von $email";
        $message = "Von: " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "<br><br>" .
                   nl2br(htmlspecialchars($messageText, ENT_QUOTES, 'UTF-8'));

        $headers = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = 'From: kontakt@ferchow-eugen.de';
        $headers[] = 'Reply-To: ' . $email;

        $sent = mail($recipient, $subject, $message, implode("\r\n", $headers));

        if ($sent) {
            echo json_encode(["success" => true, "message" => "E-Mail wurde versendet"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "E-Mail konnte nicht versendet werden"]);
        }
        exit;

    default:
        header("Allow: POST, OPTIONS", true, 405);
        exit;
}
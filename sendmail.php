<?php

header("Content-Type: application/json; charset=utf-8");

try {
    require __DIR__ . '/vendor/autoload.php';

    echo json_encode([
        "success" => true,
        "message" => "autoload ok"
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => $e->getMessage()
    ]);
}
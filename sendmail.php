<?php

header('Content-Type: application/json; charset=utf-8');

$autoload = __DIR__ . '/vendor/autoload.php';
$config = __DIR__ . '/mail-config.php';

echo json_encode([
    'dir' => __DIR__,
    'autoload_path' => $autoload,
    'autoload_exists' => file_exists($autoload),
    'autoload_readable' => is_readable($autoload),
    'config_path' => $config,
    'config_exists' => file_exists($config),
    'config_readable' => is_readable($config),
    'files_in_dir' => scandir(__DIR__),
]);
<?php
require __DIR__ . '/../engine/functions.php';

$type = $_GET['type'] ?? 'thumb';
$name = $_GET['name'] ?? '';

$dir = $type === 'original' ? STORAGE_ORIG : STORAGE_THUMBS;
serveImage($dir, $name);

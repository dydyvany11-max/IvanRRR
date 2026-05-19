<?php

define('STORAGE_ORIG',   __DIR__ . '/../storage/originals/');
define('STORAGE_THUMBS', __DIR__ . '/../storage/thumbs/');
define('THUMB_SIZE',     200);
define('MAX_FILE_SIZE',  10 * 1024 * 1024); // 10 MB

/**
 * Загружает изображение, сохраняет оригинал и создаёт миниатюру.
 * Возвращает ['ok' => true, 'name' => filename] или ['ok' => false, 'error' => message].
 */
function uploadPhoto(array $file): array
{
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return ['ok' => false, 'error' => 'Ошибка загрузки файла'];
    }

    if ($file['size'] > MAX_FILE_SIZE) {
        return ['ok' => false, 'error' => 'Файл превышает 10 МБ'];
    }

    $allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $mime    = mime_content_type($file['tmp_name']);
    if (!in_array($mime, $allowed, true)) {
        return ['ok' => false, 'error' => 'Разрешены только JPEG, PNG, GIF, WebP'];
    }

    $ext      = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid('photo_', true) . '.' . strtolower($ext);

    if (!move_uploaded_file($file['tmp_name'], STORAGE_ORIG . $filename)) {
        return ['ok' => false, 'error' => 'Не удалось сохранить файл'];
    }

    createThumbnail(STORAGE_ORIG . $filename, STORAGE_THUMBS . $filename, $mime);

    return ['ok' => true, 'name' => $filename];
}

/**
 * Создаёт квадратную миниатюру через GD.
 */
function createThumbnail(string $src, string $dst, string $mime): void
{
    switch ($mime) {
        case 'image/jpeg': $img = imagecreatefromjpeg($src); break;
        case 'image/png':  $img = imagecreatefrompng($src);  break;
        case 'image/gif':  $img = imagecreatefromgif($src);  break;
        case 'image/webp': $img = imagecreatefromwebp($src); break;
        default: return;
    }

    $w = imagesx($img);
    $h = imagesy($img);
    $side = min($w, $h);
    $x    = (int)(($w - $side) / 2);
    $y    = (int)(($h - $side) / 2);

    $thumb = imagecreatetruecolor(THUMB_SIZE, THUMB_SIZE);
    imagecopyresampled($thumb, $img, 0, 0, $x, $y, THUMB_SIZE, THUMB_SIZE, $side, $side);

    imagejpeg($thumb, $dst, 85);
    imagedestroy($img);
    imagedestroy($thumb);
}

/**
 * Возвращает список файлов в директории (без . и ..).
 */
function listFiles(string $dir): array
{
    if (!is_dir($dir)) return [];
    return array_values(array_filter(scandir($dir), fn($f) => !in_array($f, ['.', '..'], true)));
}

/**
 * Отдаёт файл изображения по безопасному пути.
 */
function serveImage(string $dir, string $name): void
{
    $name = basename($name); // защита от path traversal
    $path = $dir . $name;

    if (!file_exists($path)) {
        http_response_code(404);
        echo 'Файл не найден';
        return;
    }

    $mime = mime_content_type($path);
    header("Content-Type: {$mime}");
    readfile($path);
}

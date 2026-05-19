<?php
require __DIR__ . '/../engine/functions.php';

$page    = $_GET['page'] ?? 'home';
$message = '';

// Обработка загрузки фото
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['photo'])) {
    $result  = uploadPhoto($_FILES['photo']);
    $message = $result['ok']
        ? '<p class="msg-ok">Фото загружено успешно!</p>'
        : '<p class="msg-err">Ошибка: ' . htmlspecialchars($result['error']) . '</p>';
    $page = 'photos';
}

function renderTpl(string $tpl, array $vars = []): string
{
    extract($vars);
    ob_start();
    require __DIR__ . "/../templates/{$tpl}.php";
    return ob_get_clean();
}

switch ($page) {
    case 'photos':
        $thumbs  = listFiles(STORAGE_THUMBS);
        $content = renderTpl('photos', ['thumbs' => $thumbs, 'message' => $message]);
        $title   = 'Фотогалерея';
        break;

    case 'docs':
        $files   = listFiles(__DIR__ . '/docs/');
        $content = renderTpl('docs', ['files' => $files]);
        $title   = 'Документы';
        break;

    case 'about':
        $content = renderTpl('about');
        $title   = 'О проекте';
        break;

    default:
        $content = renderTpl('home');
        $title   = 'Главная';
}

require __DIR__ . '/../templates/layouts/main.php';

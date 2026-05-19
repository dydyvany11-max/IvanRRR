<?php
function getCatalog(): array
{
    return [
        ['id' => 1, 'name' => 'Яблоко',  'price' => 50,  'img' => 'apple.png'],
        ['id' => 2, 'name' => 'Банан',   'price' => 80,  'img' => 'banana.png'],
        ['id' => 3, 'name' => 'Апельсин','price' => 90,  'img' => 'orange.png'],
    ];
}

function renderTemplate(string $template, array $data = []): string
{
    extract($data);
    ob_start();
    require __DIR__ . "/templates/{$template}.php";
    return ob_get_clean();
}

$page = $_GET['page'] ?? 'index';

switch ($page) {
    case 'catalog':
        $content = renderTemplate('catalog', ['items' => getCatalog()]);
        $title   = 'Каталог';
        break;

    case 'about':
        $content = renderTemplate('about');
        $title   = 'О нас';
        break;

    case 'lesson18':
        $content = renderTemplate('lesson18');
        $title   = 'Задания урока 18';
        break;

    case 'apicatalog':
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(getCatalog(), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;

    default:
        $content = renderTemplate('index');
        $title   = 'Главная';
}

require __DIR__ . '/templates/layouts/main.php';

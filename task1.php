<?php
// Задание 1: Переменные PHP для страницы портфолио

$pageTitle   = 'Портфолио студента';
$studentName = 'Иван Петров';
$faculty     = 'Факультет информационных технологий';
$course      = 3;
$currentYear = date('Y');
?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title><?= $pageTitle ?></title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }
    h1   { color: #2c3e50; }
    .card { background: #f4f6f8; border-radius: 8px; padding: 20px; }
    footer { margin-top: 30px; color: #888; font-size: 0.9rem; border-top: 1px solid #ddd; padding-top: 12px; }
  </style>
</head>
<body>
  <h1><?= $pageTitle ?></h1>
  <div class="card">
    <p><strong>Имя:</strong> <?= $studentName ?></p>
    <p><strong>Факультет:</strong> <?= $faculty ?></p>
    <p><strong>Курс:</strong> <?= $course ?></p>
  </div>
  <footer>&copy; <?= $currentYear ?> <?= $studentName ?></footer>
</body>
</html>

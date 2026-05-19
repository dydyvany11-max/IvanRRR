<?php
// Задание 2: Функция вывода текущего времени словами с правильными падежами

function pluralForm(int $n, string $one, string $few, string $many): string
{
    $mod100 = abs($n) % 100;
    $mod10  = $mod100 % 10;

    if ($mod100 >= 11 && $mod100 <= 14) return $many;
    if ($mod10 === 1)                   return $one;
    if ($mod10 >= 2 && $mod10 <= 4)     return $few;
    return $many;
}

function getTimeWithWords(): string
{
    $hours   = (int) date('G');
    $minutes = (int) date('i');

    $hourWord   = pluralForm($hours,   'час',    'часа',   'часов');
    $minuteWord = pluralForm($minutes, 'минута', 'минуты', 'минут');

    return "Сейчас {$hours} {$hourWord} {$minutes} {$minuteWord}";
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <title>Задание 2 — Время</title>
</head>
<body>
  <p><?= getTimeWithWords() ?></p>
</body>
</html>

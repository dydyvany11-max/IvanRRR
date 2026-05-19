<?php
// Задание 6: Рекурсивная функция — возведение в степень

function power(int $base, int $exp): int
{
    if ($exp === 0) return 1;
    return $base * power($base, $exp - 1);
}

$base = 3;
for ($i = 0; $i <= 8; $i++) {
    echo "power({$base}, {$i}) = " . power($base, $i) . "\n";
}

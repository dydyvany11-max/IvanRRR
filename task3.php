<?php
// Задание 3: Четыре арифметических функции

function add(float $a, float $b): float      { return $a + $b; }
function subtract(float $a, float $b): float { return $a - $b; }
function multiply(float $a, float $b): float { return $a * $b; }

function divide(float $a, float $b): float
{
    if ($b == 0) {
        echo "Ошибка: деление на ноль\n";
        return 0;
    }
    return $a / $b;
}

$x = 12;
$y = 4;

echo "add({$x}, {$y})      = " . add($x, $y)      . "\n";
echo "subtract({$x}, {$y}) = " . subtract($x, $y) . "\n";
echo "multiply({$x}, {$y}) = " . multiply($x, $y) . "\n";
echo "divide({$x}, {$y})   = " . divide($x, $y)   . "\n";
echo "divide({$x}, 0)      = "; divide($x, 0);

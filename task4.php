<?php
// Задание 4: Диспетчер арифметических операций через switch

function add(float $a, float $b): float      { return $a + $b; }
function subtract(float $a, float $b): float { return $a - $b; }
function multiply(float $a, float $b): float { return $a * $b; }
function divide(float $a, float $b): float   { return $b != 0 ? $a / $b : 0; }

function mathOperation(string $op, float $a, float $b): string
{
    switch ($op) {
        case 'add':      return (string) add($a, $b);
        case 'subtract': return (string) subtract($a, $b);
        case 'multiply': return (string) multiply($a, $b);
        case 'divide':
            if ($b == 0) return 'Ошибка: деление на ноль';
            return (string) divide($a, $b);
        default:
            return "Неизвестная операция: {$op}";
    }
}

$pairs = [
    ['add',      10, 5],
    ['subtract', 10, 5],
    ['multiply', 10, 5],
    ['divide',   10, 5],
    ['divide',   10, 0],
    ['mod',      10, 5],
];

foreach ($pairs as [$op, $a, $b]) {
    echo "{$op}({$a}, {$b}) = " . mathOperation($op, $a, $b) . "\n";
}

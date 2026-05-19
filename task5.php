<?php
// Задание 5: Три способа получить текущую дату и время

// Способ 1: функция date()
$way1 = date('d.m.Y H:i:s');

// Способ 2: через strtotime + date()
$way2 = date('d.m.Y H:i:s', strtotime('now'));

// Способ 3: через объект DateTime
$dt   = new DateTime();
$way3 = $dt->format('d.m.Y H:i:s');

echo "Способ 1 (date):      {$way1}\n";
echo "Способ 2 (strtotime): {$way2}\n";
echo "Способ 3 (DateTime):  {$way3}\n";

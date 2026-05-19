<h1>Задания урока 18</h1>

<h2>1. Числа от 0 до 10: ноль / чётное / нечётное</h2>
<ul>
<?php for ($i = 0; $i <= 10; $i++):
    if ($i === 0)         $label = 'ноль';
    elseif ($i % 2 === 0) $label = 'чётное';
    else                  $label = 'нечётное';
?>
  <li><?= $i ?> — <?= $label ?></li>
<?php endfor; ?>
</ul>

<h2>2. Регионы и города</h2>
<?php
$regions = [
    'Московская область' => ['Москва', 'Химки', 'Королёв'],
    'Краснодарский край' => ['Краснодар', 'Сочи', 'Новороссийск'],
    'Свердловская область' => ['Екатеринбург', 'Нижний Тагил', 'Каменск-Уральский'],
];
foreach ($regions as $region => $cities):
?>
  <p><strong><?= htmlspecialchars($region) ?>:</strong> <?= implode(', ', array_map('htmlspecialchars', $cities)) ?></p>
<?php endforeach; ?>

<h2>3. Города на букву «К»</h2>
<ul>
<?php
$allCities = array_merge(...array_values($regions));
foreach ($allCities as $city):
    if (mb_substr($city, 0, 1) === 'К'):
?>
  <li><?= htmlspecialchars($city) ?></li>
<?php endif; endforeach; ?>
</ul>

<h2>4. Транслитерация</h2>
<?php
$map = [
    'а'=>'a','б'=>'b','в'=>'v','г'=>'g','д'=>'d','е'=>'e','ё'=>'yo','ж'=>'zh',
    'з'=>'z','и'=>'i','й'=>'y','к'=>'k','л'=>'l','м'=>'m','н'=>'n','о'=>'o',
    'п'=>'p','р'=>'r','с'=>'s','т'=>'t','у'=>'u','ф'=>'f','х'=>'kh','ц'=>'ts',
    'ч'=>'ch','ш'=>'sh','щ'=>'shch','ъ'=>'','ы'=>'y','ь'=>'','э'=>'e','ю'=>'yu','я'=>'ya',
];
$word = 'краснодар';
echo '<p>' . htmlspecialchars($word) . ' → ' . strtr($word, $map) . '</p>';
?>

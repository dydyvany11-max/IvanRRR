<?php
require __DIR__ . '/../app/database.php';
require __DIR__ . '/../app/menu.php';

$pdo  = getDb();
$tree = renderTree($pdo);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Каталог электроники</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <div class="wrapper">
    <aside class="sidebar">
      <h2 class="sidebar-title">Категории</h2>
      <?= $tree ?>
    </aside>

    <main class="main">
      <h1>Каталог электроники</h1>
      <p class="intro">Выберите категорию в меню слева, чтобы просмотреть товары.</p>
    </main>
  </div>

  <script src="js/tree.js"></script>
</body>
</html>

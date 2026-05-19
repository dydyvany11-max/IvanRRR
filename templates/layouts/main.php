<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= htmlspecialchars($title) ?></title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <nav class="navbar">
    <a class="nav-brand" href="?page=index">Магазин</a>
    <ul class="nav-menu">
      <li><a href="?page=index">Главная</a></li>
      <li><a href="?page=catalog">Каталог</a></li>
      <li><a href="?page=about">О нас</a></li>
      <li><a href="?page=lesson18">Задания</a></li>
      <li><a href="?page=apicatalog" target="_blank">API</a></li>
    </ul>
  </nav>

  <main class="main-content">
    <?= $content ?>
  </main>

  <footer class="site-footer">
    &copy; <?= date('Y') ?> Магазин
  </footer>
</body>
</html>

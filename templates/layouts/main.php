<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title><?= htmlspecialchars($title) ?></title>
  <link rel="stylesheet" href="/lesson19/public/css/style.css" />
</head>
<body>
  <nav class="navbar">
    <a class="nav-brand" href="index.php">PhotoHub</a>
    <ul class="nav-links">
      <li><a href="index.php?page=home">Главная</a></li>
      <li><a href="index.php?page=photos">Галерея</a></li>
      <li><a href="index.php?page=docs">Документы</a></li>
      <li><a href="index.php?page=about">О проекте</a></li>
    </ul>
  </nav>

  <main class="content">
    <?= $content ?>
  </main>

  <footer class="footer">&copy; <?= date('Y') ?> PhotoHub</footer>
</body>
</html>

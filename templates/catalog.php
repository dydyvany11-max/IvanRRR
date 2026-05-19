<h1>Каталог товаров</h1>
<div class="product-grid">
  <?php foreach ($items as $item): ?>
    <div class="product-card">
      <img src="img/<?= htmlspecialchars($item['img']) ?>" alt="<?= htmlspecialchars($item['name']) ?>" />
      <div class="product-name"><?= htmlspecialchars($item['name']) ?></div>
      <div class="product-price"><?= $item['price'] ?> ₽</div>
    </div>
  <?php endforeach; ?>
</div>

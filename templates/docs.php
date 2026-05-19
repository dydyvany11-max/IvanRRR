<h1>Документы</h1>
<?php if (empty($files)): ?>
  <p class="empty">Документов нет.</p>
<?php else: ?>
  <ul class="file-list">
    <?php foreach ($files as $f): ?>
      <li><a href="docs/<?= urlencode($f) ?>"><?= htmlspecialchars($f) ?></a></li>
    <?php endforeach; ?>
  </ul>
<?php endif; ?>

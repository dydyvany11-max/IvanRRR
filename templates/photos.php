<h1>Фотогалерея</h1>

<?= $message ?>

<form class="upload-form" method="post" enctype="multipart/form-data">
  <label class="upload-label">
    <input type="file" name="photo" accept="image/*" required
           onchange="if(this.files[0].size > 10*1024*1024){ alert('Файл превышает 10 МБ'); this.value=''; }" />
    <span>Выберите фото (макс. 10 МБ)</span>
  </label>
  <button type="submit">Загрузить</button>
</form>

<?php if (empty($thumbs)): ?>
  <p class="empty">Фотографий пока нет. Загрузите первую!</p>
<?php else: ?>
  <div class="photo-grid">
    <?php foreach ($thumbs as $thumb): ?>
      <a class="photo-thumb" href="img.php?type=original&name=<?= urlencode($thumb) ?>" target="_blank">
        <img src="img.php?type=thumb&name=<?= urlencode($thumb) ?>"
             alt="<?= htmlspecialchars($thumb) ?>" loading="lazy" />
      </a>
    <?php endforeach; ?>
  </div>
<?php endif; ?>

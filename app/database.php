<?php
function getDb(): PDO
{
    $dbPath   = __DIR__ . '/../storage/catalog.sqlite';
    $needSeed = !file_exists($dbPath);

    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($needSeed) {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS categories (
                id        INTEGER PRIMARY KEY AUTOINCREMENT,
                name      TEXT    NOT NULL,
                parent_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
            )
        ");
        seedCategories($pdo);
    }

    return $pdo;
}

function seedCategories(PDO $pdo): void
{
    $stmt = $pdo->prepare('INSERT INTO categories (name, parent_id) VALUES (:name, :pid)');

    $add = function (string $name, ?int $pid = null) use ($stmt, $pdo): int {
        $stmt->execute([':name' => $name, ':pid' => $pid]);
        return (int) $pdo->lastInsertId();
    };

    $root = $add('Каталог товаров');

    $sinks = $add('Мойки', $root);
    $add('Мойки врезные', $sinks);
    $add('Мойки накладные', $sinks);
    $sinksMat = $add('По материалу', $sinks);
    $add('Нержавеющая сталь', $sinksMat);
    $add('Искусственный камень', $sinksMat);

    $filters = $add('Фильтры', $root);
    $add('Фильтры кувшины', $filters);
    $add('Фильтры под мойку', $filters);
    $filterTypes = $add('По типу очистки', $filters);
    $add('Угольные', $filterTypes);
    $add('Обратный осмос', $filterTypes);
}

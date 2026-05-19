<?php
/**
 * Рекурсивно строит HTML-дерево категорий.
 */
function renderTree(PDO $pdo, ?int $parentId = null, int $depth = 0): string
{
    $stmt = $pdo->prepare('SELECT id, name FROM categories WHERE parent_id IS :pid ORDER BY name');
    $stmt->execute([':pid' => $parentId]);
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if (empty($rows)) return '';

    $html = '<ul class="tree' . ($depth === 0 ? ' tree-root' : '') . '">';
    foreach ($rows as $row) {
        $children = renderTree($pdo, (int) $row['id'], $depth + 1);
        $hasKids  = $children !== '';
        $name     = htmlspecialchars($row['name']);

        if ($hasKids) {
            $html .= '<li class="tree-node tree-node--parent" data-id="' . $row['id'] . '">';
            $html .= '<span class="tree-toggle" data-toggle>' . $name . '</span>';
            $html .= $children;
            $html .= '</li>';
        } else {
            $html .= '<li class="tree-node tree-node--leaf">';
            $html .= '<span class="tree-label">' . $name . '</span>';
            $html .= '</li>';
        }
    }
    $html .= '</ul>';
    return $html;
}

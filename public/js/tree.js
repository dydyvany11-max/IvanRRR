document.querySelectorAll('[data-toggle]').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const node = toggle.closest('.tree-node--parent');
    node.classList.toggle('tree-node--open');
  });
});

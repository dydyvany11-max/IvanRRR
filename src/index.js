const API = 'https://jsonplaceholder.typicode.com';
const PER_PAGE = 8;

let allPosts = [];
let currentPage = 1;

function show(id)  { document.getElementById(id).classList.remove('hidden'); }
function hide(id)  { document.getElementById(id).classList.add('hidden'); }

async function loadPosts() {
  try {
    const res = await fetch(`${API}/posts`);
    if (!res.ok) throw new Error(`Ошибка сервера: ${res.status}`);
    allPosts = await res.json();
    renderPage(1);
  } catch (e) {
    hide('loader');
    const err = document.getElementById('error-msg');
    err.textContent = e.message;
    show('error-msg');
  }
}

function renderPage(page) {
  currentPage = page;
  const start = (page - 1) * PER_PAGE;
  const slice = allPosts.slice(start, start + PER_PAGE);

  const grid = document.getElementById('posts-list');
  grid.innerHTML = slice.map(post => `
    <article class="post-card">
      <span class="post-id">#${post.id}</span>
      <h2 class="post-title">${capitalize(post.title)}</h2>
      <p class="post-body">${capitalize(post.body.split('\n')[0])}</p>
      <a class="read-link" href="article.html?id=${post.id}">Читать далее &rarr;</a>
    </article>
  `).join('');

  renderPagination();

  hide('loader');
  show('posts-list');
  show('pagination');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderPagination() {
  const total = Math.ceil(allPosts.length / PER_PAGE);
  const pag = document.getElementById('pagination');

  let html = '';
  if (currentPage > 1) html += `<button onclick="renderPage(${currentPage - 1})">&laquo; Назад</button>`;

  for (let i = 1; i <= total; i++) {
    html += `<button class="${i === currentPage ? 'active' : ''}" onclick="renderPage(${i})">${i}</button>`;
  }

  if (currentPage < total) html += `<button onclick="renderPage(${currentPage + 1})">Вперёд &raquo;</button>`;
  pag.innerHTML = html;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

loadPosts();

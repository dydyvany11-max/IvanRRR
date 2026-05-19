const API = 'https://jsonplaceholder.typicode.com';

function show(id)  { document.getElementById(id).classList.remove('hidden'); }
function hide(id)  { document.getElementById(id).classList.add('hidden'); }
function capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }

async function loadArticle() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    showError('Статья не найдена');
    return;
  }

  try {
    const [postRes, commentsRes] = await Promise.all([
      fetch(`${API}/posts/${id}`),
      fetch(`${API}/posts/${id}/comments`),
    ]);

    if (!postRes.ok) throw new Error(`Ошибка загрузки статьи: ${postRes.status}`);
    if (!commentsRes.ok) throw new Error(`Ошибка загрузки комментариев: ${commentsRes.status}`);

    const post     = await postRes.json();
    const comments = await commentsRes.json();

    renderArticle(post);
    renderComments(comments);
    hide('loader');
  } catch (e) {
    showError(e.message);
  }
}

function renderArticle(post) {
  const el = document.getElementById('article-content');
  el.innerHTML = `
    <span class="post-id">#${post.id}</span>
    <h1 class="article-title">${capitalize(post.title)}</h1>
    <p class="article-body">${capitalize(post.body.replace(/\n/g, '<br/>'))}</p>
  `;
  show('article-content');
}

function renderComments(comments) {
  const el = document.getElementById('comments-section');
  el.innerHTML = `
    <h2 class="comments-heading">Комментарии (${comments.length})</h2>
    ${comments.map(c => `
      <div class="comment">
        <div class="comment-author">${c.name} &middot; <a href="mailto:${c.email}">${c.email}</a></div>
        <p class="comment-body">${capitalize(c.body)}</p>
      </div>
    `).join('')}
  `;
  show('comments-section');
}

function showError(msg) {
  hide('loader');
  const err = document.getElementById('error-msg');
  err.textContent = msg;
  show('error-msg');
}

loadArticle();

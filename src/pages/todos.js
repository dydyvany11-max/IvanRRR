import { Auth }    from '../services/auth.js';
import { api }     from '../services/api.js';
import { Storage } from '../services/storage.js';

Auth.requireAuth();

document.getElementById('logout-btn').addEventListener('click', () => Auth.logout());

const loader   = document.getElementById('loader');
const listEl   = document.getElementById('todo-list');
const newInput = document.getElementById('new-task');
const addBtn   = document.getElementById('add-btn');

let todos = [];

function render() {
  listEl.innerHTML = todos.map(t => `
    <li class="todo-item ${t.completed ? 'done' : ''}" data-id="${t.id}">
      <input type="checkbox" ${t.completed ? 'checked' : ''} class="todo-check" />
      <span class="todo-text">${t.todo}</span>
      <button class="todo-delete" title="Удалить">✕</button>
    </li>
  `).join('');

  listEl.querySelectorAll('.todo-check').forEach(cb => {
    cb.addEventListener('change', () => toggleTodo(Number(cb.closest('li').dataset.id), cb.checked));
  });

  listEl.querySelectorAll('.todo-delete').forEach(btn => {
    btn.addEventListener('click', () => deleteTodo(Number(btn.closest('li').dataset.id)));
  });
}

async function loadTodos() {
  const user = Storage.getUser();
  try {
    const data = await api.get(`/todos/user/${user.id}`);
    todos = data.todos;
    loader.style.display = 'none';
    listEl.classList.remove('hidden');
    render();
  } catch (e) {
    loader.textContent = 'Ошибка загрузки: ' + e.message;
  }
}

async function addTodo() {
  const text = newInput.value.trim();
  if (!text) return;
  const user = Storage.getUser();
  try {
    const newTodo = await api.post('/todos/add', { todo: text, completed: false, userId: user.id });
    todos.unshift(newTodo);
    newInput.value = '';
    render();
  } catch (e) {
    alert('Ошибка: ' + e.message);
  }
}

async function toggleTodo(id, completed) {
  try {
    const updated = await api.put(`/todos/${id}`, { completed });
    todos = todos.map(t => t.id === id ? { ...t, completed: updated.completed } : t);
    render();
  } catch (e) {
    alert('Ошибка: ' + e.message);
  }
}

async function deleteTodo(id) {
  try {
    await api.del(`/todos/${id}`);
    todos = todos.filter(t => t.id !== id);
    render();
  } catch (e) {
    alert('Ошибка: ' + e.message);
  }
}

addBtn.addEventListener('click', addTodo);
newInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTodo(); });

loadTodos();

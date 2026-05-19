import { Auth }    from '../services/auth.js';
import { Storage } from '../services/storage.js';

Auth.requireAuth();

document.getElementById('logout-btn').addEventListener('click', () => Auth.logout());

const loader  = document.getElementById('loader');
const cardEl  = document.getElementById('profile-card');
const user    = Storage.getUser();

if (user) {
  loader.style.display = 'none';
  cardEl.innerHTML = `
    <div class="avatar">${user.firstName?.[0] ?? '?'}${user.lastName?.[0] ?? ''}</div>
    <h2>${user.firstName} ${user.lastName}</h2>
    <p class="profile-field"><span>Логин:</span> ${user.username}</p>
    <p class="profile-field"><span>Email:</span> ${user.email}</p>
  `;
  cardEl.classList.remove('hidden');
}

import { Auth }    from '../services/auth.js';
import { validate } from '../services/validate.js';

Auth.requireGuest();

const form      = document.getElementById('login-form');
const submitBtn = document.getElementById('submit-btn');
const formError = document.getElementById('form-error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  let valid = true;
  valid = validate('username', username, [{ rule: 'required', msg: 'Введите логин' }]) && valid;
  valid = validate('password', password, [{ rule: 'required', msg: 'Введите пароль' }]) && valid;

  if (!valid) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Вход...';
  formError.classList.add('hidden');

  try {
    await Auth.login(username, password);
    window.location.href = 'todos.html';
  } catch (err) {
    formError.textContent = err.message;
    formError.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Войти';
  }
});

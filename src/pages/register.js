import { Auth }    from '../services/auth.js';
import { validate } from '../services/validate.js';

Auth.requireGuest();

const form      = document.getElementById('reg-form');
const submitBtn = document.getElementById('submit-btn');
const formError = document.getElementById('form-error');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email    = document.getElementById('email').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;
  const confirm  = document.getElementById('confirm').value;

  let valid = true;
  valid = validate('email',    email,    [{ rule: 'required', msg: 'Введите email' }, { rule: 'email', msg: 'Некорректный email' }]) && valid;
  valid = validate('username', username, [{ rule: 'required', msg: 'Введите логин' }, { rule: 'minLength', min: 3, msg: 'Минимум 3 символа' }]) && valid;
  valid = validate('password', password, [{ rule: 'required', msg: 'Введите пароль' }, { rule: 'minLength', min: 6, msg: 'Минимум 6 символов' }]) && valid;

  const confirmMatch = password === confirm;
  const errConfirm = document.getElementById('err-confirm');
  if (!confirmMatch) {
    errConfirm.textContent = 'Пароли не совпадают';
    valid = false;
  } else {
    errConfirm.textContent = '';
  }

  if (!valid) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Создание...';
  formError.classList.add('hidden');

  try {
    // DummyJSON doesn't support real registration; simulate and redirect to login
    alert('Регистрация выполнена! Используйте демо-данные для входа.');
    window.location.href = 'login.html';
  } catch (err) {
    formError.textContent = err.message;
    formError.classList.remove('hidden');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Создать аккаунт';
  }
});

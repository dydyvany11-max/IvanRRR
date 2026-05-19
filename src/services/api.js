import { BASE_URL } from './config.js';
import { Storage }  from './storage.js';

async function request(path, options = {}) {
  const token = Storage.getToken();
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) throw new Error(data.message || `Ошибка ${res.status}`);
  return data;
}

export const api = {
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  get:  (path)       => request(path),
  put:  (path, body) => request(path, { method: 'PUT',  body: JSON.stringify(body) }),
  del:  (path)       => request(path, { method: 'DELETE' }),
};

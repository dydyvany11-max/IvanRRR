import { api }     from './api.js';
import { Storage } from './storage.js';

export const Auth = {
  async login(username, password) {
    const data = await api.post('/auth/login', { username, password, expiresInMins: 60 });
    Storage.setToken(data.accessToken);
    Storage.setUser({ id: data.id, username: data.username, email: data.email, firstName: data.firstName, lastName: data.lastName });
    return data;
  },

  logout() {
    Storage.clear();
    window.location.href = 'login.html';
  },

  isLoggedIn() {
    return !!Storage.getToken();
  },

  requireAuth() {
    if (!this.isLoggedIn()) window.location.href = 'login.html';
  },

  requireGuest() {
    if (this.isLoggedIn()) window.location.href = 'todos.html';
  },
};

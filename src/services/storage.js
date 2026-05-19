const TOKEN_KEY = 'app_token';
const USER_KEY  = 'app_user';

export const Storage = {
  getToken:  ()    => localStorage.getItem(TOKEN_KEY),
  setToken:  (t)   => localStorage.setItem(TOKEN_KEY, t),
  clearToken:()    => localStorage.removeItem(TOKEN_KEY),
  getUser:   ()    => { const u = localStorage.getItem(USER_KEY); return u ? JSON.parse(u) : null; },
  setUser:   (u)   => localStorage.setItem(USER_KEY, JSON.stringify(u)),
  clearUser: ()    => localStorage.removeItem(USER_KEY),
  clear:     ()    => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); },
};

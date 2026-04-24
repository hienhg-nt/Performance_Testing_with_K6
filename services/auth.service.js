import http from 'k6/http';
import { check } from 'k6';
import { extractToken } from '../utils/token.js';
import { buildRequestConfig } from '../utils/request.js';


export function registerNopCommerce(config, payload) {
  const registerURL = `${config.baseUrl}${config.endpoints.register}`;

  const getRes = http.get(registerURL);
  check(getRes, {
    'Register page loaded': (r) => r.status === 200,
  });

  const token = extractToken(getRes);
  check(token, {
    'Token extracted': (t) => !!t,
  });
  if (!token) return console.error("Could not extract token");

  payload.__RequestVerificationToken = token;

  const postRes = http.post(registerURL, payload);
  check(postRes, {
    'Register': (r) => r.status === 200 || r.status === 302,
  });

  return postRes;
}

export function loginNopCommerce(config, user) {
  const loginURL = `${config.baseUrl}${config.endpoints.login}`;

  const getRes = http.get(loginURL);
  const token = extractToken(getRes);
  if (!token) return console.error("Could not extract token");

  user.__RequestVerificationToken = token;

  const postRes = http.post(loginURL, user);
  check(postRes, {
    'Logged in': (r) => r.status === 201 || r.status === 200,
  });

  return postRes;
}

export function registerPizza(config, user) {
  const url = `${config.baseUrl}${config.endpoints.register}`;
  const headers = { 'Content-Type': 'application/json' };
  const payload = JSON.stringify(user);

  const res = http.post(url, payload, { headers });

  check(res, {
    'Registered': (r) => r.status === 201 || r.status === 200,
  });

  return res;
}

export function loginPizza(config, user) {
  const url = `${config.baseUrl}${config.endpoints.login}`;
  const headers = { 'Content-Type': 'application/json' };
  const payload = JSON.stringify(user);

  const res = http.post(url, payload, { headers });

  check(res, {
    'Logged in successfully': (r) => r.status === 201 || r.status === 200,
  });

  return res;  
}

export function logoutPizza(config, payload, authToken) {
  const url = `${config.baseUrl}${config.endpoints.logout}`;
  const cfg = buildRequestConfig(authToken, { name: 'Logout' });
  cfg.headers = { 'Content-Type': 'application/json', ...(cfg.headers || {}) };

  const res = http.post(url, JSON.stringify(payload), cfg);

  check(res, {
    'Logged out successfully': (r) => r.status === 200,
  });

  return res;
}
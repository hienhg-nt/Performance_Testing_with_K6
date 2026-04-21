import http from 'k6/http';
import { check } from 'k6';
import { buildRequestConfig } from '../utils/request.js';

export function createRating(env, authToken, payload) {
  const url = `${env.baseUrl}${env.endpoints.rating}`;
  const cfg = buildRequestConfig(authToken, { name: 'Create' });
  cfg.headers = { 'Content-Type': 'application/json', ...(cfg.headers || {}) };

  const res = http.post(url, JSON.stringify(payload), cfg);

  check(res, {
    'Rating created': (r) => r.status === 201,
  });

  return res;
}

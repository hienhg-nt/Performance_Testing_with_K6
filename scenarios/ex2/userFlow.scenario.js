import http from 'k6/http';
import { CONFIG } from '../../config/env.js';
import { registerPizza, loginPizza, logoutPizza } from '../../services/auth.service.js';
import { createRating } from '../../services/rating.service.js';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { check, sleep, group } from 'k6';
import { buildRequestConfig } from '../../utils/request.js';

const productData = new SharedArray('products', function () {
  return papaparse.parse(open('../../data/pizza.csv'), { header: true }).data;
});

export function userFlowScenario() {
  const targetEnv = __ENV.TARGET_ENV;
  const env = CONFIG[targetEnv];

  const user = {
    username: `user_${__VU}_${__ITER}_${Date.now()}`,
    password: 'secret',
  };

  group('Register', () => {
    const res = registerPizza(env, user);
  });

  let authToken = null;
  group('Login', () => {
    const res = loginPizza(env, user);
    authToken = res.json('token');
  });

  group('Create Rating', () => {
    const product = randomItem(productData);
    const payload = {
      pizza_id: Number(product.pizzaID),
      stars: Number(product.ratings),
    };
    const res = createRating(env, authToken, payload);
  });

  group('Logout', () => {
    const res = logoutPizza(env, user, authToken);
  });
}

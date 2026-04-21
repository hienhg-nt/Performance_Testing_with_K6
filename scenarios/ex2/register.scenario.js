import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { CONFIG } from '../../config/env.js';
import { registerPizza } from '../../services/auth.service.js';

const userData = new SharedArray('users', function () {
  return papaparse.parse(open('../../data/user.csv'), { header: true }).data;
});

export function registerScenario() {
  const targetEnv = __ENV.TARGET_ENV;
  const env = CONFIG[targetEnv];

  const user = {
    username: `user_${__VU}_${__ITER}_${Date.now()}`,
    password: 'secret',
  };

  const res = registerPizza(env, user);
  sleep(1);
}
import { check, sleep } from 'k6';
import http from 'k6/http';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { CONFIG } from '../../config/env.js';
import { registerNopCommerce } from '../../services/auth.service.js';

export function registerScenario() {
  const env = __ENV.TARGET_ENV;
  const config = CONFIG[env];

  const uniqueId = uuidv4();

  const payload = {
    FirstName: `first${uniqueId}`,
    LastName: `last${uniqueId}`,
    Email: `user_${uniqueId}@gmail.com`,
    Password: 'admin123@',
    ConfirmPassword: 'admin123@',
  };

  const res = registerNopCommerce(config, payload);
  sleep(1);
}
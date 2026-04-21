import { loginNopCommerce } from '../../services/auth.service.js';
import { addToCart, viewProduct } from '../../services/cart.service.js';
import http from 'k6/http';
import { extractToken } from '../../utils/token.js';
import { SharedArray } from 'k6/data';
import { randomItem, randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';
import { check, sleep, group } from 'k6';
import { CONFIG } from '../../config/env.js';

const csvData = new SharedArray('users', function () {
  return papaparse.parse(open('../../data/user.csv'), { header: true }).data;
});

const productData = new SharedArray('products', function () {
  return papaparse.parse(open('../../data/product.csv'), { header: true }).data;
});

export function userFlowScenario() {
  const env = __ENV.TARGET_ENV;
  const config = CONFIG[env];

  let viewProductRes;
  const user = randomItem(csvData);
  const payload = {
    Emmail: user.email,
    Password: user.password,
  };

  group('Login', function () {
    const res = loginNopCommerce(config, payload);
    sleep(1);
  });

  group('View Products', function () {
    viewProductRes = viewProduct(config, randomItem(productData).productName);
    sleep(1);
  });
  if (Math.random() < 0.5) {
    group('Add to Cart', function () {
      const cartPayload = {
        "addtocart_4.EnteredQuantity": randomIntBetween(productData.orderMinimumQuantity, productData.orderMaximumQuantity),
      };
      const res = addToCart(viewProductRes.productURL, cartPayload, viewProductRes.token);
      sleep(1);
    });
  }
  
}
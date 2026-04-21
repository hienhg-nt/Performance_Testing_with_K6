import http from 'k6/http';
import { cleanSlug } from '../utils/format.js';
import { check } from 'k6';
import { extractToken } from '../utils/token.js';

export function viewProduct(config, productName) {
  const productURL = `${config.baseUrl}/${cleanSlug(productName)}`;

  const getRes = http.get(productURL);
  check(getRes, {'View product page': (r) => r.status === 200});

  const token = extractToken(getRes);
  if (!token) return console.error("Could not extract token");

  return {getRes, token, productURL};
}

export function addToCart(productURL, cartPayload, token) {
  cartPayload.__RequestVerificationToken = token;

  let cartRes = http.post(productURL, cartPayload);
  check(cartRes, {
    'Add to cart': (r) => r.status === 200 || r.status === 302,
  })
}
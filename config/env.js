export const CONFIG = {
  nop_commerce_env: {
    baseUrl: 'http://localhost:5000',
    endpoints: {
      register: '/register',
      login: '/login',
    },
  },

  pizza_test_env: {
    baseUrl: 'https://quickpizza.grafana.com',
    endpoints: {
      register: '/api/users',
      login: '/api/users/token/login',
      rating: '/api/ratings',
    },
  },
};
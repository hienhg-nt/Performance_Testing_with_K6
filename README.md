
# K6Demo

K6Demo is a sample k6 test project for REST API performance testing. It contains test scenarios, services, test data, and utilities to demonstrate load testing patterns with k6 for two systems: a NopCommerce-like app and a Pizza ordering API.

---

## Contents

- Project: K6Demo (k6-based performance tests)
- Language: JavaScript (ES6)

## Prerequisites

- [k6](https://dl.k6.io/msi/k6-latest-amd64.msi) installed
- Node.js (for editing, not required to run tests)
- [NopCommerce/NopWeb](https://www.nopcommerce.com/download-nopcommerce-link?type=sourcepackage) or your NopWeb instance running at http://localhost:5000 for commerce scenarios

## Quick start

Restore dependencies and run a test:

```sh
# For commerce scenarios
k6 run test/commerce.main.js

# For pizza scenarios
k6 run test/pizza.main.js
```

## Repository structure (important paths)

- config/env.js           — environment/config values
- data/                   — test data (CSV files)
- scenarios/ex1/          — NopCommerce scenarios (register, user flow)
- scenarios/ex2/          — Pizza API scenarios (register, user flow)
- services/               — service layer (auth, cart, rating)
- test/                   — main entry points for k6
- utils/                  — helpers for formatting, requests, tokens

## Configuration

Edit `config/env.js` to set base URLs and endpoints for each environment.

## Adding scenarios

- Add new scenario files under `scenarios/ex1/` or `scenarios/ex2/` as needed.
- Reference them in the appropriate main test file in `test/`.
- Use the service layer to keep scenarios focused on flows and logic.

## Notes

- Test data is stored in `data/` as CSV files.
- REST calls are performed via service wrappers in `services/`.
- Utility functions are in `utils/`.

## Contributing

Open issues or submit PRs with clear descriptions and test coverage where appropriate.

## License

Add an appropriate license file if you intend to open-source this project.

Edit `config/env.js` to set base URLs and endpoints for each environment.

### Data Files

- `data/user.csv`: Should contain user credentials (email, password, etc.)
- `data/product.csv`: Product info for commerce flows
- `data/pizza.csv`: Pizza product info for pizza flows

### Extending

Add new scenarios in the `scenarios/` folder and reference them in the appropriate main test file in `test/`.

---


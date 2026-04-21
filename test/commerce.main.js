import { registerScenario } from '../scenarios/ex1/register.scenario.js';
import { userFlowScenario } from '../scenarios/ex1/userFlow.scenario.js';

export const options = {
  scenarios: {
    register_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 5 },
        { duration: '60s', target: 5 },
        { duration: '10s', target: 0 },
      ],
      env: {
        TARGET_ENV: 'nop_commerce_env',
      },
      exec: 'registerScenario',
    },

    user_flow_test: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 5,
      env: {
        TARGET_ENV: 'nop_commerce_env',
      },
      exec: 'userFlowScenario',
    },
  },
};

export { registerScenario, userFlowScenario };
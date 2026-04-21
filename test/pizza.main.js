import { registerScenario } from '../scenarios/ex2/register.scenario.js';
import { userFlowScenario } from '../scenarios/ex2/userFlow.scenario.js';

export const options = {
  scenarios: {
    register_test: {
      executor: 'shared-iterations',
      vus: 5,
      iterations: 5,
      env: {
        TARGET_ENV: 'pizza_test_env',
      },
      exec: 'registerScenario',
    },

    user_flow_test: {
      executor: 'constant-arrival-rate',
      rate: 5,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 10,
      maxVUs: 10, 
      env: {
        TARGET_ENV: 'pizza_test_env',
      },
      exec: 'userFlowScenario',
    },
  },
};

export { registerScenario, userFlowScenario };
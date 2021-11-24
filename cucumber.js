require('dotenv').config();

const worldParameters = {
  appUrl: process.env.BASE_APP_URL || 'http://localhost:4321',
  generationServiceUrl: process.env.GENERATION_SERVICE_URL || 'http://localhost:4321',
  authorizationHeader: process.env.AUTH_HEADER || null,
  validatorServiceUrl: process.env.VALIDATOR_SERVICE_URL || null,
  mockPort: process.env.MOCK_PORT || null
};

const worldParametersLocal = {
  ...worldParameters,
  validatorServiceUrl: 'http://localhost:4567/validate',
  mockPort: 4321
};

const common = `--world-parameters '${JSON.stringify(worldParameters)}'`;

module.exports = {
  default: `${common} --format progress-bar --format html:./cucumber-report.html`,
  ci: `${common} --format html:./cucumber-report.html --publish`,
  local: `--require 'test/**/*.js' --require 'features/**/*.js' --world-parameters '${JSON.stringify(worldParametersLocal)}' --format progress-bar --format html:./cucumber-report.html`
};

require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const worldParameters = {
  appUrl: process.env.BASE_APP_URL || 'http://localhost:4321',
  generationServiceUrl: process.env.GENERATION_SERVICE_URL || 'http://localhost:4321',
  authorizationHeader: process.env.AUTH_HEADER || null,
  validatorServiceUrl: process.env.VALIDATOR_SERVICE_URL || null,
  mockPort: process.env.MOCK_PORT || null
};

const common = `--world-parameters '${JSON.stringify(worldParameters)}' --format html:./cucumber-report.html --publish-quiet`;

module.exports = {
  default: `${common} --format progress-bar`,
  ci: `${common}`,
  test: `${common} --require 'test/**/*.js' --require 'features/**/*.js' --format progress-bar`
};

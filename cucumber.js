require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const worldParameters = {
  authorizationHeader: process.env.AUTH_HEADER || null,
  validatorServiceUrl: process.env.VALIDATOR_SERVICE_URL || null,
  generationServiceUrl:
    process.env.GENERATION_SERVICE_URL || 'http://localhost:4321',
  repositoryServiceUrl:
    process.env.REPOSITORY_SERVICE_URL || 'http://localhost:4321',
  registryServiceUrl:
    process.env.REGISTRY_SERVICE_URL || 'http://localhost:4321',
  mockPort: process.env.MOCK_PORT || null,
};

const common = `--world-parameters '${JSON.stringify(
  worldParameters
)}' --format html:./cucumber-report.html --publish-quiet`;

module.exports = {
  default: `${common} --format progress-bar`,
  ci: `${common}`,
  test: `${common} --require 'test/**/*.js' --require 'features/**/*.js' --format progress-bar`,
};

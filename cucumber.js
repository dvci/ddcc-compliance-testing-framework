require('dotenv').config();

const worldParameters = {
  appUrl: process.env.BASE_APP_URL || 'http://localhost:4321',
  mockPort: process.env.MOCK_PORT || null
};

const worldParametersLocal = { ...worldParameters, mockPort: 4321 };

const common = `--world-parameters '${JSON.stringify(worldParameters)}'`;

module.exports = {
  default: `${common} --format progress-bar --format html:./cucumber-report.html`,
  ci: `${common} --format html:./cucumber-report.html --publish`,
  local: `--world-parameters '${JSON.stringify(worldParametersLocal)}' --format progress-bar --format html:./cucumber-report.html`
};

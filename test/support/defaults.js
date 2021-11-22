const { mock } = require('pactum');
const { Before, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const mockConfig = require('./mockConfig');

BeforeAll(() => {
  // perform some shared setup
  mockConfig.setup();
});

Before(function (testCase, callback) {
  // perform some shared setup, if already running will log a warning but no error
  if (this.parameters.mockPort !== null) {
    mock.start(parseInt(this.parameters.mockPort, 10))
      .then(() => callback())
      .catch((error) => callback(error))
  }
});

AfterAll(() => {
  // perform some shared teardown
  mock.stop();
});

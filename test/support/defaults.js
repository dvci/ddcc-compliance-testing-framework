const { mock } = require('pactum');
const { Before, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const mockConfig = require('./mockConfig');

let mockStarted = false;

BeforeAll(() => {
  // perform some shared setup
  mockConfig.setup();
});

Before(function (testCase, callback) {
  if (this.parameters.mockPort !== null && !mockStarted) {
    mock
      .start(parseInt(this.parameters.mockPort, 10))
      .then(() => {
        mockStarted = true;
        callback();
      })
      .catch((error) => callback(error));
  } else {
    callback();
  }
});

AfterAll(() => {
  // perform some shared teardown
  mock.stop();
  mockStarted = false;
});

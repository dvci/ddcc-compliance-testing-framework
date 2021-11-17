const { request, settings } = require('pactum');
const { Before, BeforeAll, AfterAll }= require('@cucumber/cucumber');
const { mock } = require('pactum');
const mockConfig = require('./mockConfig.js');

BeforeAll(function () {
  // perform some shared setup
  mockConfig.setup();
});

Before(function (testCase, callback) {
  request.setBaseUrl(this.parameters.appUrl);
  settings.setReporterAutoRun(false);

  // perform some shared setup, if already running will log a warning but no error
  if(this.parameters.mockPort !== null){      
    mock.start(this.parameters.mockPort)
      .then(() => callback())
      .catch((error) => callback(error))
  }
});

AfterAll(function () {
  // perform some shared teardown
  mock.stop();
});
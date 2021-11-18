const { request, settings } = require('pactum');
const { Before } = require('@cucumber/cucumber');

Before(function () {
  request.setBaseUrl(this.parameters.appUrl);
  settings.setReporterAutoRun(false);
});

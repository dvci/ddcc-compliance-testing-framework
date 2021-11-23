const { request, settings } = require('pactum');
const { Before } = require('@cucumber/cucumber');

Before({ tags: 'not @GenerationService' }, function () {
  request.setBaseUrl(this.parameters.appUrl);
  settings.setReporterAutoRun(false);
});

Before({ tags: '@GenerationService' }, function () {
  request.setBaseUrl(this.parameters.generationServiceUrl);
  settings.setReporterAutoRun(false);
});

Before({ tags: '@RepositoryService' }, function () {
  request.setBaseUrl(this.parameters.repositoryServiceUrl);
  settings.setReporterAutoRun(false);
});

Before({ tags: '@RegistryService' }, function () {
  request.setBaseUrl(this.parameters.registryServiceUrl);
  settings.setReporterAutoRun(false);
});

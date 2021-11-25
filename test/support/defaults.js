const { mock } = require('pactum');
const { Before, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { like } = require('pactum-matchers');
const mockConfig = require('./mockConfig');

const sheResponse = require('../fixtures/Bundle-DDCC-TX-SHE-response-example-1.json');
const sheResponseError = require('../fixtures/OperationOutcome-example.json');
const ddccDocument = require('../fixtures/Bundle-DDCC-Document-example.json');

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

Before({ tags: '@SubmitHealthEvent' }, () => {
  mock.addInteraction([{
    id: 'submitHealthEvent',
    strict: false,
    request: {
      method: 'POST',
      path: '/submitHealthEvent',
      body: {
        resourceType: like('Bundle'),
        id: like('DDCC-TX-SHE-bundle-example-1')
      }
    },
    response: {
      status: 201,
      body: sheResponse
    }
  }]);
});

Before({ tags: '@SubmitInvalidHealthEvent' }, () => {
  mock.addInteraction([{
    id: 'submitHealthEvent',
    strict: false,
    request: {
      method: 'POST',
      path: '/submitHealthEvent',
      body: {
        resourceType: like('Bundle'),
        id: like('DDCC-TX-SHE-bundle-example-invalid')
      }
    },
    response: {
      status: 422,
      body: sheResponseError
    }
  }]);
});

Before({ tags: '@GenerateHealthCertificate' }, () => {
  mock.addInteraction([{
    id: 'generateHealthCertificate',
    strict: false,
    request: {
      method: 'POST',
      path: '/QuestionnaireResponse/$generateHealthCertificate',
      body: {
        resourceType: like('Parameters'),
        id: like('DDCC-VS-TX-SHE-Parameters-1')
      }
    },
    response: {
      status: 201,
      body: ddccDocument
    }
  }]);
});

AfterAll(() => {
  // perform some shared teardown
  mock.stop();
});

const { mock } = require('pactum');
const { Before, BeforeAll, AfterAll } = require('@cucumber/cucumber');
const { like } = require('pactum-matchers');
const mockConfig = require('./mockConfig');

const operationOutcomeError = require('../fixtures/OperationOutcome-example.json');
const rhcResponse = require('../fixtures/Response-ProvideDDCCDocument.json');

BeforeAll(() => {
  // perform some shared setup
  mockConfig.setup();
});

Before(function (testCase, callback) {
  // perform some shared setup, if already running will log a warning but no error
  if (this.parameters.mockPort !== null) {
    mock
      .start(parseInt(this.parameters.mockPort, 10))
      .then(() => callback())
      .catch((error) => callback(error));
  }
});

Before({ tags: '@StoreHealthCertificate' }, () => {
  mock.addInteraction({
    id: 'storeHealthCertificate',
    strict: false,
    request: {
      method: 'POST',
      path: '/Bundle',
      body: {
        resourceType: like('Bundle'),
        id: like('Example-English'),
      },
    },
    response: {
      status: 201,
      headers: {
        location: '/DDCCDocument/TESTID/_history/TESTVERSION',
      },
    },
  });
});

Before({ tags: '@StoreHealthCertificate-400' }, () => {
  mock.addInteraction({
    id: 'storeHealthCertificate-400',
    strict: false,
    request: {
      method: 'POST',
      path: '/Bundle',
      body: {},
    },
    response: {
      status: 400,
      body: operationOutcomeError,
    },
  });
});

Before({ tags: '@StoreHealthCertificate-404-1' }, () => {
  mock.addInteraction({
    id: 'storeHealthCertificate-404-1',
    strict: false,
    request: {
      method: 'POST',
      path: '/Bundle',
      body: {
        resourceType: like('INVALIDTYPE'),
      },
    },
    response: {
      status: 404,
      body: operationOutcomeError,
    },
  });
});

Before({ tags: '@StoreHealthCertificate-404-2' }, () => {
  mock.addInteraction({
    id: 'storeHealthCertificate-404',
    strict: false,
    request: {
      method: 'POST',
      path: '/INVALIDENDPOINT',
    },
    response: {
      status: 404,
      body: operationOutcomeError,
    },
  });
});

Before({ tags: '@StoreHealthCertificate-422' }, () => {
  mock.addInteraction({
    id: 'storeHealthCertificate-422',
    strict: false,
    request: {
      method: 'POST',
      path: '/Bundle',
      body: {
        resourceType: like('Bundle'),
        id: like('DDCC-Document-Invalid'),
      },
    },
    response: {
      status: 422,
      body: operationOutcomeError,
    },
  });
});

Before({ tags: '@RegisterHealthCertificate' }, () => {
  mock.addInteraction({
    id: 'registerHealthCertificate',
    strict: false,
    request: {
      method: 'POST',
      path: '/',
      body: {
        resourceType: like('Bundle'),
        id: like('ex-minimalProvideDocumentBundleSimple'),
      },
    },
    response: {
      status: 200,
      body: rhcResponse,
    },
  });
});

Before({ tags: '@RegisterInvalidHealthCertificate' }, () => {
  mock.addInteraction({
    id: 'registerInvalidHealthCertificate',
    strict: false,
    request: {
      method: 'POST',
      path: '/',
      body: {
        resourceType: like('Bundle'),
        id: like('ex-minimalProvideDocumentBundleSimple-invalid'),
      },
    },
    response: {
      status: 422,
      body: operationOutcomeError,
    },
  });
});

AfterAll(() => {
  // perform some shared teardown
  mock.stop();
});

const { mock } = require('pactum');
const { like, oneOf } = require('pactum-matchers');

const sheResponse = require('../fixtures/Bundle-DDCC-TX-SHE-response-example-1.json');
const operationOutcomeError = require('../fixtures/OperationOutcome-example.json');
const ddccDocument = require('../fixtures/Bundle-DDCC-Document-example.json');
const rhcResponse = require('../fixtures/Response-ProvideDDCCDocument.json');

const config = {
  setup() {
    mock.addInteraction([
      {
        id: 'storeHealthCertificate',
        strict: false,
        request: {
          method: 'POST',
          path: '/Bundle',
          body: {
            resourceType: 'Bundle',
            id: like('Example-English'),
            type: 'document',
          },
        },
        response: {
          status: 201,
          headers: {
            Location: '/DDCCDocument/TESTID',
          },
        },
      },
      {
        id: 'storeInvalidHealthCertificate-400',
        strict: false,
        request: {
          method: 'POST',
          path: '/Bundle',
          body: {
            resourceType: 'Bundle',
            id: 'Bundle-DDCCDocument-400',
          },
        },
        response: {
          status: 400,
          body: operationOutcomeError,
        },
      },
      {
        id: 'storeInvalidHealthCertificate-404-1',
        strict: false,
        request: {
          method: 'POST',
          path: '/INVALIDENDPOINT',
        },
        response: {
          status: 404,
          body: operationOutcomeError,
        },
      },
      {
        id: 'storeInvalidHealthCertificate-404-2',
        strict: false,
        request: {
          method: 'POST',
          path: '/Bundle',
          body: {
            resourceType: 'INVALIDTYPE',
          },
        },
        response: {
          status: 404,
          body: operationOutcomeError,
        },
      },
      {
        id: 'storeInvalidHealthCertificate-422',
        strict: false,
        request: {
          method: 'POST',
          path: '/Bundle',
          body: {
            resourceType: 'Bundle',
            id: 'Bundle-DDCCDocument-422',
            type: 'document',
          },
        },
        response: {
          status: 422,
          body: operationOutcomeError,
        },
      },
      {
        id: 'submitValidHealthEvent',
        strict: false,
        request: {
          method: 'POST',
          path: '/submitHealthEvent',
          body: {
            resourceType: 'Bundle',
            id: like('DDCC-TX-SHE-bundle-example-1'),
            type: 'batch',
            entry: like([{ resource: { resourceType: 'Parameters' } }]),
          },
        },
        response: {
          status: 201,
          body: sheResponse,
        },
      },
      {
        id: 'submitInvalidHealthEvent',
        strict: false,
        request: {
          method: 'POST',
          path: '/submitHealthEvent',
          body: {
            resourceType: 'Bundle',
            id: 'DDCC-TX-SHE-bundle-example-invalid',
          },
        },
        response: {
          status: 422,
          body: operationOutcomeError,
        },
      },
      {
        id: 'generateHealthCertificate',
        strict: false,
        request: {
          method: 'POST',
          path: '/QuestionnaireResponse/$generateHealthCertificate',
          body: {
            resourceType: 'Parameters',
            id: like('DDCC-VS-TX-SHE-Parameters-1'),
            parameter: [
              {
                name: oneOf(['response', 'id']),
              },
            ],
          },
        },
        response: {
          status: 201,
          body: ddccDocument,
        },
      },
      {
        id: 'generateHealthCertificateInvalid',
        strict: false,
        request: {
          method: 'POST',
          path: '/QuestionnaireResponse/$generateHealthCertificate',
          body: {
            resourceType: 'Parameters',
            id: 'DDCC-VS-TX-SHE-Parameters-1-invalid',
          },
        },
        response: {
          status: 422,
          body: operationOutcomeError,
        },
      },
      {
        id: 'registerHealthCertificate',
        strict: false,
        request: {
          method: 'POST',
          path: '/',
          body: {
            resourceType: 'Bundle',
            id: like('ex-minimalProvideDocumentBundleSimple'),
            type: 'transaction',
          },
        },
        response: {
          status: 200,
          body: rhcResponse,
        },
      },
      {
        id: 'registerInvalidHealthCertificate-422',
        strict: false,
        request: {
          method: 'POST',
          path: '/',
          body: {
            resourceType: 'Bundle',
            id: 'Bundle-ProvideDDCCDocument-422',
            type: 'transaction',
          },
        },
        response: {
          status: 422,
          body: operationOutcomeError,
        },
      },
      {
        id: 'registerInvalidHealthCertificate-400',
        strict: false,
        request: {
          method: 'POST',
          path: '/',
          body: {
            resourceType: 'Bundle',
            id: 'Bundle-ProvideDDCCDocument-400',
          },
        },
        response: {
          status: 400,
          body: operationOutcomeError,
        },
      },
    ]);
  },
};

module.exports = config;

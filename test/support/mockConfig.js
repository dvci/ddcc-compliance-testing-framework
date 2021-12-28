const { mock } = require('pactum');
const { like, oneOf } = require('pactum-matchers');

const operationOutcomeRequired = require('../fixtures/OperationOutcome/OperationOutcome-required.json');
const operationOutcomeNotFound = require('../fixtures/OperationOutcome/OperationOutcome-not-found.json');
const operationOutcomeInvalid = require('../fixtures/OperationOutcome/OperationOutcome-invalid.json');
const sheResponse = require('../fixtures/Bundle-DDCC-TX-SHE-response-example-1.json');
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
          body: operationOutcomeRequired,
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
          body: operationOutcomeNotFound,
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
          body: operationOutcomeNotFound,
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
          body: operationOutcomeInvalid,
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
          body: operationOutcomeRequired,
        },
      },
      {
        id: 'generateValidHealthCertificate',
        strict: false,
        request: {
          method: 'POST',
          path: '/QuestionnaireResponse/$generateHealthCertificate',
          body: {
            resourceType: 'Parameters',
            id: like('DDCC-VS-TX-SHE-Parameters-1'),
            parameter: [
              {
                name: oneOf(['response', 'id'])
              }
            ]
          }
        },
        response: {
          status: 201,
          body: ddccDocument
        }
      },
      {
        id: 'generateInvalidHealthCertificate',
        strict: false,
        request: {
          method: 'POST',
          path: '/QuestionnaireResponse/$generateHealthCertificate',
          body: {
            resourceType: 'Parameters',
            id: 'DDCC-VS-TX-SHE-Parameters-1-invalid'
          }
        },
        response: {
          status: 422,
          body: operationOutcomeRequired,
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
          body: operationOutcomeInvalid,
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
          body: operationOutcomeRequired,
        },
      },
    ]);
  },
};

module.exports = config;

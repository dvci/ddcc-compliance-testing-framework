const { mock } = require('pactum');
const { like, oneOf } = require('pactum-matchers');

const operationOutcomeRequired = require('../fixtures/OperationOutcome/OperationOutcome-required.json');
const operationOutcomeNotFound = require('../fixtures/OperationOutcome/OperationOutcome-not-found.json');
const operationOutcomeInvalid = require('../fixtures/OperationOutcome/OperationOutcome-invalid.json');
const sheResponse = require('../fixtures/submitHealthEvent/Bundle-DDCC-TX-SHE-response-example-1.json');
const sheResponseArabic = require('../fixtures/submitHealthEvent/language-response-examples/Bundle-DDCC-TX-SHE-response-example-Arabic.json');
const sheResponseChinese = require('../fixtures/submitHealthEvent/language-response-examples/Bundle-DDCC-TX-SHE-response-example-Chinese.json');
const sheResponseFrench = require('../fixtures/submitHealthEvent/language-response-examples/Bundle-DDCC-TX-SHE-response-example-French.json');
const sheResponseRussian = require('../fixtures/submitHealthEvent/language-response-examples/Bundle-DDCC-TX-SHE-response-example-Russian.json');
const sheResponseSpanish = require('../fixtures/submitHealthEvent/language-response-examples/Bundle-DDCC-TX-SHE-response-example-Spanish.json');
const ddccDocumentSigned = require('../fixtures/generateHealthCertificate/Bundle-DDCC-Document-signed.json');
const rhcResponse = require('../fixtures/registerHealthCertificate/Response-ProvideDDCCDocument.json');
const storeHCRetrieveResults = require('../fixtures/storeHealthCertificate/Bundle-DDCCDocument-unsigned.json');

const config = {
  setup() {
    mock.addInteraction([
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
        id: 'submitValidArabicHealthEvent',
        strict: false,
        request: {
          method: 'POST',
          path: '/submitHealthEvent',
          body: {
            resourceType: 'Bundle',
            id: 'DDCC-TX-SHE-bundle-example-Arabic',
            type: 'batch',
            entry: like([{ resource: { resourceType: 'Parameters' } }]),
          },
        },
        response: {
          status: 201,
          body: sheResponseArabic,
        },
      },
      {
        id: 'submitValidChineseHealthEvent',
        strict: false,
        request: {
          method: 'POST',
          path: '/submitHealthEvent',
          body: {
            resourceType: 'Bundle',
            id: 'DDCC-TX-SHE-bundle-example-Chinese',
            type: 'batch',
            entry: like([{ resource: { resourceType: 'Parameters' } }]),
          },
        },
        response: {
          status: 201,
          body: sheResponseChinese,
        },
      },
      {
        id: 'submitValidFrenchHealthEvent',
        strict: false,
        request: {
          method: 'POST',
          path: '/submitHealthEvent',
          body: {
            resourceType: 'Bundle',
            id: 'DDCC-TX-SHE-bundle-example-French',
            type: 'batch',
            entry: like([{ resource: { resourceType: 'Parameters' } }]),
          },
        },
        response: {
          status: 201,
          body: sheResponseFrench,
        },
      },
      {
        id: 'submitValidRussianHealthEvent',
        strict: false,
        request: {
          method: 'POST',
          path: '/submitHealthEvent',
          body: {
            resourceType: 'Bundle',
            id: 'DDCC-TX-SHE-bundle-example-Russian',
            type: 'batch',
            entry: like([{ resource: { resourceType: 'Parameters' } }]),
          },
        },
        response: {
          status: 201,
          body: sheResponseRussian,
        },
      },
      {
        id: 'submitValidSpanishHealthEvent',
        strict: false,
        request: {
          method: 'POST',
          path: '/submitHealthEvent',
          body: {
            resourceType: 'Bundle',
            id: 'DDCC-TX-SHE-bundle-example-Spanish',
            type: 'batch',
            entry: like([{ resource: { resourceType: 'Parameters' } }]),
          },
        },
        response: {
          status: 201,
          body: sheResponseSpanish,
        },
      },
      {
        id: 'storeInvalidHealthCertificate-400',
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
                name: oneOf(['response', 'id']),
              },
            ],
          },
        },
        response: {
          status: 200,
          body: ddccDocumentSigned,
        },
      },
      {
        id: 'generateInvalidHealthCertificate',
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
          body: operationOutcomeRequired,
        },
      },
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
            Location: '/Bundle/TESTID',
          },
        },
      },
      {
        id: 'retrieveStoreHealthCertificateResults',
        strict: false,
        request: {
          method: 'GET',
          path: '/Bundle/TESTID',
        },
        response: {
          status: 200,
          body: storeHCRetrieveResults,
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
      {
        id: 'retrieveRegisterHealthCertificate-List',
        strict: false,
        request: {
          method: 'GET',
          path: '/List/1',
        },
        response: {
          status: 200,
        },
      },
      {
        id: 'retrieveRegisterHealthCertificate-DocumentReference',
        strict: false,
        request: {
          method: 'GET',
          path: '/DocumentReference/1',
        },
        response: {
          status: 200,
        },
      },
      {
        id: 'retrieveRegisterHealthCertificate-Patient',
        strict: false,
        request: {
          method: 'GET',
          path: '/Patient/1',
        },
        response: {
          status: 200,
        },
      },
    ]);
  },
};

module.exports = config;

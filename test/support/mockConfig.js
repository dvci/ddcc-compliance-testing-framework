const { mock } = require('pactum');
const { like, oneOf } = require('pactum-matchers');

const sheResponse = require('../fixtures/Bundle-DDCC-TX-SHE-response-example-1.json');
const operationOutcomeError = require('../fixtures/OperationOutcome-example.json');
const ddccDocument = require('../fixtures/Bundle-DDCC-Document-example.json');

const config = {
  setup() {
    mock.addInteraction([{
      id: 'submitValidHealthEvent',
      strict: false,
      request: {
        method: 'POST',
        path: '/submitHealthEvent',
        body: {
          resourceType: 'Bundle',
          id: like('DDCC-TX-SHE-bundle-example-1'),
          type: 'batch',
          entry: like([{ resource: { resourceType: 'Parameters' } }])
        }
      },
      response: {
        status: 201,
        body: sheResponse
      }
    },
    {
      id: 'submitInvalidHealthEvent',
      strict: false,
      request: {
        method: 'POST',
        path: '/submitHealthEvent',
        body: {
          resourceType: 'Bundle',
          id: 'DDCC-TX-SHE-bundle-example-invalid'
        }
      },
      response: {
        status: 422,
        body: operationOutcomeError
      }
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
      id: 'generateHealthCertificateInvalid',
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
        body: operationOutcomeError
      }
    }]);
  }
}

module.exports = config;

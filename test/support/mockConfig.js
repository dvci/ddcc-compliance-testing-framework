const { mock } = require('pactum');
const { like } = require('pactum-matchers');
const sheResponse = require('../fixtures/Bundle-DDCC-TX-SHE-response-example-1.json');

const config = {
  setup() {
    mock.addInteraction({
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
    });
  }
}

module.exports = config;

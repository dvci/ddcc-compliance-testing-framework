const { mock } = require('pactum');
const { like } = require('pactum-matchers');

const config = {
    setup(){
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
              body: 'Hello, 👋'
            }
        });
    }
}

module.exports = config;
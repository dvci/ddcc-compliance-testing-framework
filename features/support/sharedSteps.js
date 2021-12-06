const pactum = require('pactum');
const { expression } = require('pactum-matchers');
const { Given, Then } = require('@cucumber/cucumber');
const { includes } = require('pactum-matchers');

// eslint-disable-next-line prefer-arrow-callback
Given(/I set json body to the file at (.*)$/, function (fixture) {
  this.spec.withJson(fixture);
});

Then(
  /I expect response should validate against the profile (.*)$/,
  async function (profile) {
    if (this.parameters.validatorServiceUrl === null) {
      return Promise.resolve('skipped');
    }

    const response = await pactum
      .spec()
      .post(`${this.parameters.validatorServiceUrl}?profile=${profile}`)
      // eslint-disable-next-line no-underscore-dangle
      .withJson(this.spec._response.json);

    if (response.statusCode !== 200) {
      Promise.reject(
        new Error(
          `Error executing FHIR validator service: ${response.statusMessage}`
        )
      );
    }

    pactum
      .expect(response)
      .to.have.jsonMatch(
        'issue[*].severity',
        expression(null, '!$V.includes("fatal")')
      );
    pactum
      .expect(response)
      .to.have.jsonMatch(
        'issue[*].severity',
        expression(null, '!$V.includes("error")')
      );
    return Promise.resolve();
  }
);

// eslint-disable-next-line prefer-arrow-callback
Then(
  /I expect a response entry exists for each request entry (.*)/,
  function (resources) {
    const resourceList = resources.split(',').map((value) => value.trim());
    const numResources = resourceList.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < numResources; i++) {
      this.spec.response().should.have.jsonMatch(`entry[${i}]`, {
        response: { location: includes(resourceList[i]) },
      });
    }
  }
);

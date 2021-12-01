const pactum = require('pactum');
const { expression } = require('pactum-matchers');
const { Given, Then } = require('@cucumber/cucumber');

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

// TODO: Clean up this step
Then(
  /I expect AuditEvent resource to be created with ID (.*)$/,
  async function (id) {
    const response = await pactum
      .spec()
      .get(`${this.parameters.validatorServiceUrl}/AuditEvent/${id}`);

    if (response.statusCode !== 200) {
      Promise.reject(
        new Error(
          `Error executing FHIR validator service: ${response.statusMessage}`
        )
      );
    }

    // add pactum.expect statements for what the Audit Event should look like
    // should we be looking for a certain ID?
    return Promise.resolve();
  }
);

const pactum = require('pactum');
const { expression } = require('pactum-matchers');
const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');
const fs = require('fs');

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
  /I expect a response entry exists for each request entry in same order/,
  async function () {
    const responseResources = [];
    const requestResources = [];
    // eslint-disable-next-line no-underscore-dangle
    this.spec._response.body.entry.forEach((responseEntry) => {
      const { location } = responseEntry.response;
      const resourceType = location.substring(0, location.lastIndexOf('/'));
      responseResources.push(resourceType);
    });

    // eslint-disable-next-line no-underscore-dangle
    this.spec._request.body.entry.forEach((requestEntry) => {
      const { resourceType } = requestEntry.resource;
      requestResources.push(resourceType);
    });
    expect(responseResources).to.have.ordered.members(requestResources);
  }
);

Then(/I expect response should have value (.*) at path (.*)/, function (value, path) {
  this.spec.response().should.have.jsonMatch(path, value);
});

Then(/I expect response should have a json body like the file at (.*)$/, function (fixture) {
  const json = fs.readFileSync(`${fixture}`);
  this.spec.response().should.have.jsonLike(JSON.parse(json));
});

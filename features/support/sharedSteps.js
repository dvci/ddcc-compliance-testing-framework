const pactum = require('pactum');
const { expression } = require('pactum-matchers');
const { Given, Then } = require('@cucumber/cucumber');
const { expect } = require('chai');

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
    // eslint-disable-next-line no-underscore-dangle
    const responseResources = this.spec._response.body.entry.map(
      (responseEntry) => {
        const { location } = responseEntry.response;
        return location.substring(0, location.lastIndexOf('/'));
      }
    );

    // eslint-disable-next-line no-underscore-dangle
    const requestResources = this.spec._request.body.entry.map(
      (requestEntry) => requestEntry.resource.resourceType
    );

    expect(responseResources).to.have.ordered.members(requestResources);
  }
);

// eslint-disable-next-line prefer-arrow-callback
Then(
  /I expect the GET request sent to each location should return status 200/,
  async function () {
    // eslint-disable-next-line no-underscore-dangle
    const responseLocations = this.spec._response.body.entry.map(
      (responseEntry) => {
        const { location } = responseEntry.response;
        return location;
      }
    );

    const responsePromises = responseLocations.map(async (location) => {
      const response = await pactum.spec().get(`/${location}`);
      try {
        pactum.expect(response).should.have.status(200);
      } catch (e) {
        throw new Error(e.message);
      }
    });
    await Promise.all(responsePromises);
  }
);

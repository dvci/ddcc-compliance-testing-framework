/* eslint-disable prefer-arrow-callback, no-underscore-dangle */

const pactum = require('pactum');
const { Given, Then } = require('@cucumber/cucumber');
const { expect, assert } = require('chai');
const fs = require('fs');

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
      .withJson(this.spec._response.json);

    if (response.statusCode !== 200) {
      return Promise.reject(
        new Error(
          `Error executing FHIR validator service: ${response.statusMessage}`
        )
      );
    }

    const responsePromises = response.json.issue.map(
      async (issue) => {
        assert.notStrictEqual(issue.severity, 'error', JSON.stringify(issue));
        assert.notStrictEqual(issue.severity, 'fatal', JSON.stringify(issue));
      }
    );
    return Promise.all(responsePromises);
  }
);

Then(
  /I expect response should have a json body like the file at (.*)$/,
  function (fixture) {
    const json = fs.readFileSync(`${fixture}`);
    this.spec.response().should.have.jsonLike(JSON.parse(json));
  }
);

Then(
  /I expect the results from the GET request sent to the response location header should have a json body like the file at (.*)$/,
  async function (fixture) {
    const json = fs.readFileSync(`${fixture}`);
    const response = await pactum
      .spec()
      .get(this.spec._response.headers.location);
    // performs partial, non-strict json matching
    pactum.expect(response).to.have.jsonLike(JSON.parse(json));
  }
);

Then(
  /I expect a response entry exists for each request entry in same order/,
  async function () {
    const responseResources = this.spec._response.body.entry.map(
      (responseEntry) => {
        const { location } = responseEntry.response;
        return location.substring(0, location.lastIndexOf('/'));
      }
    );

    const requestResources = this.spec._request.body.entry.map(
      (requestEntry) => requestEntry.resource.resourceType
    );

    expect(responseResources).to.have.ordered.members(requestResources);
  }
);

// eslint-disable-next-line prefer-arrow-callback
Then(
  'I expect the GET request sent to each response entry location should have a status {int}',
  async function (statusCode) {
    // eslint-disable-next-line no-underscore-dangle
    const responsePromises = this.spec._response.body.entry.map(
      async (entry) => {
        const { location } = entry.response;
        const response = await pactum.spec().get(`/${location}`);
        pactum.expect(response).should.have.status(statusCode);
      }
    );
    await Promise.all(responsePromises);
  }
);

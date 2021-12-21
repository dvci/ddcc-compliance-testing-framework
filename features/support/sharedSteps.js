const pactum = require('pactum');
const { expression } = require('pactum-matchers');
const {
  Given, Then
} = require('@cucumber/cucumber');

// eslint-disable-next-line prefer-arrow-callback
Given(/I set json body to the file at (.*)$/, function (fixture) {
  this.spec.withJson(fixture);
});

Then(/I expect response should validate against the profile (.*)$/, async function (profile) {
  if (this.parameters.validatorServiceUrl === null) {
    return Promise.resolve('skipped');
  }

  const response = await pactum.spec()
    // .name('Submit Health Event')
    .post(`${this.parameters.validatorServiceUrl}?profile=${profile}`)
    // eslint-disable-next-line no-underscore-dangle
    .withJson(this.spec._response.json);
    // .expectJsonSnapshot();
    // .updateSnapshot();

  if (response.statusCode !== 200) {
    Promise.reject(new Error(`Error executing FHIR validator service: ${response.statusMessage}`));
  }

  pactum.expect(response).to.have.jsonMatch('issue[*].severity', expression(null, '!$V.includes("fatal")'));
  pactum.expect(response).to.have.jsonMatch('issue[*].severity', expression(null, '!$V.includes("error")'));
  // pactum.expect(response).to.have.jsonSnapshot();
  return Promise.resolve();
});

Then(/I expect response should have value (.*) at path (.*)/, function (value, path) {
  this.spec.response().should.have.jsonMatch(path, value);
});

Then(/I expect fields should be persisted between the request and the repsonse/, function () {
  // this.spec.response().should.have.jsonMatch({ hello: 'fsdf' });
  // await pactum.spec()
  //   .name('Submit Health Event')

  // TODO: Make this dynamic so that it can be inputted via each respoective Gherkin test
  this.spec.name('Submit Health Event');
  this.spec.expectJsonSnapshot();
  // console.log(this.spec.response().should.have.response.jsonSnapshot)
  // this.spec.should.have.jsonSnapshot();
  // console.lothis.spec.response().should.have.jsonSnapshot());
  // this.spec.settings.setSnapshotDirectoryPath('/')
  // this.spec.updateSnapshot()
});

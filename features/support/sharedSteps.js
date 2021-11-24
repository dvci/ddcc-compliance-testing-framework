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
  const response = await pactum.spec()
    .post(`http://localhost:4567/validate?profile=${profile}`)
    // eslint-disable-next-line no-underscore-dangle
    .withJson(this.spec._response.json);
  pactum.expect(response).to.have.status(200);
  pactum.expect(response).to.have.jsonMatch('issue[*].severity', expression(null, '!$V.includes("fatal")'));
  pactum.expect(response).to.have.jsonMatch('issue[*].severity', expression(null, '!$V.includes("error")'));
});

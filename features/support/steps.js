const pactum = require('pactum');
const {
  Given, When, Then, Before, After
} = require('@cucumber/cucumber');
const { includes } = require('pactum-matchers');

let spec = pactum.spec();

// eslint-disable-next-line prefer-arrow-callback
Before(function () {
  spec = pactum.spec();
  this.spec = spec;
  if (this.parameters.authorizationHeader !== null) {
    spec.withHeaders('Authorization', this.parameters.authorizationHeader);
  }
});

Given(/^I make a (.*) request to (.*)$/, (method, endpoint) => {
  spec[method.toLowerCase()](endpoint);
});

Given(/^I set path param (.*) to (.*)$/, (key, value) => {
  spec.withPathParams(key, value);
});

Given(/^I set query param (.*) to (.*)$/, (key, value) => {
  spec.withQueryParams(key, value);
});

Given(
  /^I set basic authentication credentials (.*) and (.*)$/,
  (username, password) => {
    spec.withAuth(username, password);
  }
);

Given(/^I set header (.*) to (.*)$/, (key, value) => {
  spec.withHeaders(key, value);
});

Given(/I set body to/, (body) => {
  spec.withBody(body);
});

Given(/^I upload file at (.*)$/, (filePath) => {
  spec.withFile(filePath);
});

Given(/^I set multi-part form param (.*) to (.*)$/, (key, value) => {
  spec.withMultiPartFormData(key, value);
});

When('I receive a response', async () => {
  await spec.toss();
});

Then('I expect response should have a status {int}', (code) => {
  spec.response().should.have.status(code);
});

Then(/^I expect response header (.*) should be (.*)$/, (key, value) => {
  spec.response().should.have.header(key, value);
});

Then(/^I expect response header (.*) should have (.*)$/, (key, value) => {
  spec.response().should.have.headerContains(key, value);
});

Then(/^I expect response should have a json$/, (json) => {
  spec.response().should.have.json(JSON.parse(json));
});

Then(/^I expect response should have a json at (.*)$/, (path, value) => {
  spec.response().should.have.json(path, JSON.parse(value));
});

Then(/^I expect response should have a json like$/, (json) => {
  spec.response().should.have.jsonLike(json);
});

Then(/^I expect response should have a json like at (.*)$/, (path, value) => {
  spec.response().should.have.jsonLike(path, JSON.parse(value));
});

Then(/^I expect response should have a json schema$/, (json) => {
  spec.response().should.have.jsonSchema(JSON.parse(json));
});

Then(/^I expect response should have a json schema at (.*)$/, (path, value) => {
  spec.response().should.have.jsonSchema(path, JSON.parse(value));
});

Then(/^I expect response should have a body$/, (body) => {
  spec.response().should.have.body(body);
});

Then('I expect response should have {string}', (handler) => {
  spec.response().should.have._(handler);
});

Then(/^I store response at (.*) as (.*)$/, (path, name) => {
  spec.stores(name, path);
});

Then(
  /I expect a response entry exists for each request entry (.*)/,
  (resources) => {
    const resourceList = resources.split(',').map((value) => value.trim());
    const numResources = resourceList.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < numResources; i++) {
      spec.response().should.have.jsonMatch(`entry[${i}]`, {
        response: { location: includes(resourceList[i]) },
      });
    }
  }
);

After(() => {
  spec.end();
});

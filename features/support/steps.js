const pactum = require('pactum');
const {
  Given, When, Then, Before, After
} = require('@cucumber/cucumber');

let spec = pactum.spec();

Before(() => {
  spec = pactum.spec();
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

Given(/^I set basic authentication credentials (.*) and (.*)$/, (username, password) => {
  spec.withAuth(username, password);
});

Given(/^I set header (.*) to (.*)$/, (key, value) => {
  spec.withHeaders(key, value);
});

Given(/I set body to/, (body) => {
  spec.withBody(body);
});

Given(/I set json to the file at (.*)$/, (fixture) => {
  spec.withJson(fixture);
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
  spec.response().should.have.header(key, value)
});

Then(/^I expect response header (.*) should have (.*)$/, (key, value) => {
  spec.response().should.have.headerContains(key, value)
});

Then(/^I expect response should have a json$/, (json) => {
  spec.response().should.have.json(JSON.parse(json));
});

Then(/^I expect response should have a json at (.*)$/, (path, value) => {
  spec.response().should.have.json(path, JSON.parse(value));
});

Then(/^I expect response should have a json like$/, (json) => {
  spec.response().should.have.jsonLike(JSON.parse(json));
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

After(() => {
  spec.end();
});

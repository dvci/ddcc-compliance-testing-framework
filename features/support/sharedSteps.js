const {
  Given
} = require('@cucumber/cucumber');

// eslint-disable-next-line prefer-arrow-callback
Given(/I set json body to the file at (.*)$/, function (fixture) {
  this.spec.withJson(fixture);
});

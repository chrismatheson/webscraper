const expect = require('expect.js');
const get = require('../get');

describe('webscraper', function () {
  it('should fetch some data', function () {
    return get('http://www.google.com').then(data => expect(data).to.match(/\<html/i));
  });
});
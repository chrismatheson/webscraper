const expect = require('expect.js');
const scrapper = require('../index');

describe('webscraper', function () {
  it('should fetch some data', function () {
    return scrapper().then(data => expect(data).to.match(/\<html/));
  });
});
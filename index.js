const get = require('./get');

const URL = 'http://hiring-tests.s3-website-eu-west-1.amazonaws.com/2015_Developer_Scrape/5_products.html';

module.exports = function () {
  return get(URL);
};
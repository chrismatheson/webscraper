const get = require('./get');
const extract = require('./extract_static_data');
const transform = require('./transform');

const URL = 'http://hiring-tests.s3-website-eu-west-1.amazonaws.com/2015_Developer_Scrape/5_products.html';

get(URL)
  .then(extract)
  .map(function (result) {
    result.unit_price = transform.parsePrice(result.unit_price);
    result.title = transform.trimWhiteSpace(result.title);
    result.description = transform.trimWhiteSpace(result.description);
    return result;
  })
  .reduce(transform.sumarise, { results: [], total: 0 })
  .then(console.log);
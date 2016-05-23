const get = require('./get');
const process = require('./extract_static_data');

const URL = 'http://hiring-tests.s3-website-eu-west-1.amazonaws.com/2015_Developer_Scrape/5_products.html';

get(URL).then(process).then(console.log);
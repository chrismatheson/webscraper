const Promise = require('bluebird');
const http = require('http');

const URL = 'http://hiring-tests.s3-website-eu-west-1.amazonaws.com/2015_Developer_Scrape/5_products.html';

const get = function (uril) {
  return new Promise(function (resolve, reject) {
    var body = '';
    http.get(URL, function (res) {
      res.on('data', chunk => body += chunk)
      res.on('end', function () {
        resolve(body);
      });
      res.on('error', reject);
    })
    .on('error', reject)
  });
}

module.exports = get;
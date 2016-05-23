const Promise = require('bluebird');
const http = require('http');

module.exports = function (URL) {
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
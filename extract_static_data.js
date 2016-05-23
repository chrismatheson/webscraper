const Promise = require('bluebird');
const cheerio = require('cheerio'); //jQuery-esqe library, should be easy for most to grok.
const sumurise_links = function () {
  return Promise.resolve({ size: 34.6, description: 'something'});
}

function consume(html) {
  const $ = cheerio.load(html);
  return $('.product').map(function (i, singleProduct) {
    return {
      title: $(singleProduct).find('h3').text(),
      productLink: $(singleProduct).find('h3 a').attr('href'),
      unit_price: $(singleProduct).find('.pricePerUnit').text()
    };
  }).toArray();
}

function parsePrice(unclean) {
  return parseFloat(unclean.match(/[\d\.]+/g)[0]);
}

function inlineParsePrice(data) {
  data.unit_price = parsePrice(data.unit_price);
  return data;
}

module.exports = function (html) {
  return consume(html).map(inlineParsePrice);
}
const Promise = require('bluebird');
const $ = require('cheerio'); //jQuery-esqe library, should be easy for most to grok.
const get = require('./get');

const waitForAsyncThings = Promise.props;

function consume(html) {
  return Promise.map($('.product', html).toArray(), function (singleProduct) {

    const productLink = $(singleProduct).find('h3 a').attr('href');
    const productHtml = get(productLink);

    return {
      title: $('h3', singleProduct).text(),
      size: productHtml.then(html => html.length),
      description: productHtml.then(html => $('#information .access', html).text()),
      unit_price: $('.pricePerUnit', singleProduct).text()
    };
  });
}

function parsePrice(unclean) {
  return parseFloat(unclean.match(/[\d\.]+/g)[0]);
}

function inlineParsePrice(data) {
  data.unit_price = parsePrice(data.unit_price);
  return data;
}

module.exports = function (html) {
  return consume(html)
    .map(waitForAsyncThings)
    .map(inlineParsePrice);
}
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
      description: productHtml.then(html => $('#information productcontent div', html).eq(0).text()),
      unit_price: $('.pricePerUnit', singleProduct).text()
    };
  }).map(waitForAsyncThings);
}


module.exports = consume;
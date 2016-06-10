const Promise = require('bluebird');
const $ = require('cheerio'); //jQuery-esqe library, should be easy for most to grok.
const get = require('./get');

const waitForAsyncThings = Promise.props;

function sizeOf(eventualHtml) {
  return eventualHtml.then(text => text.length);
}

function descriptionFrom(eventualHtml) {
  return eventualHtml.then(html => $(html).find('#information productcontent div').eq(0).text())
}

function titleFrom(html) {
  return $(html).find('h3').text();
}

function priceFrom(html) {
  return $(html).find('.pricePerUnit').text()
}

function productsFrom(html) {
  return $(html).find('.product').toArray()
}

function productLinkFrom(html) {
  return $(html).find('h3 a').attr('href')
}

function consume(html) {
  return Promise.map(productsFrom(html), function (singleProduct) {
    const productHtml = get(productLinkFrom(singleProduct));

    return {
      title: titleFrom(singleProduct),
      size: sizeOf(productHtml),
      description: descriptionFrom(productHtml), //There is a better selector for this but i cant think of it just now
      unit_price: priceFrom(singleProduct)
    };
  }).map(waitForAsyncThings);
}


module.exports = consume;
function parsePrice(unclean) {
  return parseFloat(unclean.match(/[\d\.]+/g)[0]);
}

function sumarise(summary, next) {
  summary.results.push(next);
  summary.total += next.unit_price;
  summary.total = (Math.round(summary.total * 100) * 0.01) //correct JS rounding errors
  return summary;
}

function trimWhiteSpace(str) {
  return str.replace(/^[ \t\n]+/, '').replace(/[ \t\n]+$/, '')
}

function formatAsKilloBytes(num) {
  return (num / 1000).toString(10) + 'kb';
}

module.exports = {
  trimWhiteSpace,
  parsePrice,
  sumarise,
  formatAsKilloBytes
}

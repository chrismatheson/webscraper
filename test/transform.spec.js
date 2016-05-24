const expect = require('expect.js');
const transform = require('../transform');

describe('transform', function () {

  describe('parsePrice', function () {
    it('should deal with weird octal edge cases', function () {
      expect(transform.parsePrice('08')).to.be(8);
    });
  });

  describe('trimWhiteSpace', function () {
    it('should ignore all the rubbish HTML can spit out', function () {
      const cleaned = transform.trimWhiteSpace('\n\t                                    \n\t                                        Sainsbury\'s Apricot Ripe & Ready x5\n\t                                        \n\t                                    \n\t                                ');
      expect(cleaned).to.be('Sainsbury\'s Apricot Ripe & Ready x5');
    });


    it('should leave spaces between words', function () {
      const cleaned = transform.trimWhiteSpace('\n\t                                    \n\t                                        Sainsbury\'s Apricot Ripe & Ready x5\n\t                                        \n\t                                    \n\t                                ');
      expect(cleaned).to.match(/ /);
    });

    it('should not modify when not required', function () {
      const cleaned = transform.trimWhiteSpace('Sainsbury\'s Apricot Ripe & Ready x5');
      expect(cleaned).to.be('Sainsbury\'s Apricot Ripe & Ready x5');
    });

    it('should be idempotent', function () {
      var cleaned = transform.trimWhiteSpace('      Sainsbury\'s Apricot Ripe & Ready x5   ');
      cleaned = transform.trimWhiteSpace(cleaned);
      cleaned = transform.trimWhiteSpace(cleaned);
      cleaned = transform.trimWhiteSpace(cleaned);
      expect(cleaned).to.be('Sainsbury\'s Apricot Ripe & Ready x5');
    });
  });

  describe('sumarise', function () {
    it('should avoid rounding errors', function () {
      const summary = [{unit_price:0.2},{unit_price:0.1}].reduce(transform.sumarise, {results: [], total:0});
      expect(summary.total).to.be(0.3);
    });
  });

  describe('formatAsKilloBytes', function () {});

});
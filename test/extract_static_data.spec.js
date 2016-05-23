const extract = require('../extract_static_data');
const expect = require('expect.js');

const noProducts = `
<html>
<body>
  <div>
  </div>
</body>
</html>
`

const singleProduct = `
<html>
<body>
  <div>
    <div class="product ">
      <div class="productInner">
          <div class="productInfoWrapper">
              <div class="productInfo">
                  <h3>
                      <a href="http://hiring-tests.s3-website-eu-west-1.amazonaws.com/2015_Developer_Scrape/sainsburys-apricot-ripe---ready-320g.html">
                          Sainsbury's Apricot Ripe &amp; Ready x5
                          <img src="http://c2.sainsburys.co.uk/wcsstore7.11.1.161/SainsburysStorefrontAssetStore/wcassets/product_images/media_7572754_M.jpg" alt="">
                      </a>
                  </h3>
              </div>
          </div>
          <p class="pricePerUnit">
          £3.50<abbr title="per">/</abbr>
          </p>
      </div>
    </div>
  </div>
</body>
</html>
`

describe('extract_satatic_data', function () {
  it('should find nothing', function () {
    expect(extract(noProducts).length).to.be(0);
  });

  describe('when there is a single product', function () {
    var data = null;
    beforeEach(function () {
      data = extract(singleProduct);
    });

    it('should find a single product fragment', function () {
      expect(data.length).to.be(1);
    });

    it('should contain the product title', function () {
      expect(data[0].title).to.match(/Sainsbury\'s Apricot Ripe & Ready x5/);
    });

    it('should contain the product price', function () {
      expect(data[0].unit_price).to.be(3.5);
    });
  });

  it('should do something usefull with non html data');
  it('should report unreachable downstreams');
});
const model = require('./model');

module.exports = {
  getProducts: (req, res) => {
    // URL has '?page=${page}&count=${count}'
    const page = req.query.page ? req.query.page : 1;
    const count = req.query.count ? req.query.count : 20;

    model.getProducts(page, count, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },

  getProduct: (req, res) => {
    model.getProduct(req.params.productid, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },

  getStyles: (req, res) => {
    model.getStyles(req.params.productid, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  },

};

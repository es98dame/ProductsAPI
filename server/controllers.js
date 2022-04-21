const model = require('./model');

module.exports = {
  getProducts: (req, res) => {
    // URL has '?page=${page}&count=${count}'
    const { page } = req.query;
    const { count } = req.query;
    // console.log('page',page);
    // console.log('count', count);
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

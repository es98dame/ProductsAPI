// app, controllers, model
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const controller = require('./controllers');

const PORT = process.env.PORT || 3000;

// app.use(express.static('client/dist')); //make sure !!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//loader.io
app.get('/loaderio-b0a47902a09e868b2612c64501de692b/' (req, res) => {
  res.send('loaderio-b0a47902a09e868b2612c64501de692b')
})

// ------------------------------------Overview
// ------------------------------------Routes API URL
// get products
// axios.get(host + `/products?page=${page}&count=${count}`, options)
app.get('/products', (req, res) => {
  // pass req.query to controller
  controller.getProducts(req, res);
});

// get product
// axios.get(host + '/products/' + product_id, options)
app.get('/products/:productid', (req, res) => {
  controller.getProduct(req, res);
});

// get styles
// axios.get(host + '/products/' + product_id + '/styles', options)
app.get('/products/:productid/styles', (req, res) => {
  controller.getStyles(req, res);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = { app };

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/atelier', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.on('open', () => {
  console.log('successful connection');
});

const styles = mongoose.Schema({
  name: String,
  original_price: Number,
  sale_price: Number,
  is_default: Boolean,
  photos: [photos],
});

let photos = mongoose.Schema({
  thumbnail_url: String,
  url: String,
});

const products = mongoose.Schema({
  id: Number,
  product_id: Number,
  name: String,
  slogan: String,
  description: String,
  default_price: Number,
  features: String,
  value: String,
  styles: [styles],
  skus: Number,
  size: String,
  quantity: Number,
});

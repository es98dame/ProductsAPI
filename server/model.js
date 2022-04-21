// DB Connection here
const { Pool } = require('pg');

const credentials = {
  host: 'localhost',
  user: 'postgres',
  database: 'atelier',
  port: 5432,
};
const pool = new Pool(credentials);

module.exports = {
  getProducts: (page, count, callback) => {
    pool.query('SELECT * from products LiMIT 5', (err, data) => {
      if (err) {
        // console.log('err in model.js');
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  getProduct: (callback) => {
    pool.query('SELECT * from products LiMIT 5', (err, data) => {
      if (err) {
        // console.log('err in model.js');
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
  getStyles: (callback) => {
    pool.query('SELECT * from products LiMIT 5', (err, data) => {
      if (err) {
        // console.log('err in model.js');
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
};

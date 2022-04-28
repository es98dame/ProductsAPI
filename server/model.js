// DB Connection here
const { Pool } = require('pg');
const config = require('../config.js');

const pool = new Pool({
  host: config.DATABASE_HOST,
  user: config.DATABASE_USERNAME,
  database: config.DATABASE_NAME,
  password: config.DATABASE_PASSWORD,
  port: config.PORT,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) {
      return console.error('Error executing query', err.stack);
    }
    console.log(result.rows);
  });
});

module.exports = {
  getProducts: (page, count, callback) => {
    pool.query(`SELECT * FROM products ORDER BY id ASC LIMIT ${count} OFFSET ${page}`)
      .then((res) => callback(null, res))
      .catch((err) => callback(err));
  },

  getProduct: (id, callback) => {
    pool.query(`SELECT p.*, json_agg(json_build_object(
      'feature', f.feature,
      'value', f.value
  )) AS features
    FROM products as p JOIN features as f
    ON f.product_id = p.id WHERE p.id = ${id} GROUP BY p.id`, (err, data) => {
      if (err) {
        // console.log('err in model.js');
        callback(err);
      } else {
        callback(null, data );
      }
    });
  },


  getStyles: (id, callback) => {
    pool.query(`
    SELECT s.product_id,
    (SELECT coalesce(json_agg(json_build_object(
          'style_id', s.id,
          'name', s.name,
          'original_price', s.original_price,
          'sale_price', s.sale_price,
          'default?', s.default_style,
        'photos', (SELECT coalesce(json_agg(
          json_build_object(
          'thumbnail_url', p.thumbnail_url,
          'url', p.url
            )
        ) ,'[]')
        FROM photos as p WHERE p.style_id = s.id),
         'skus', (SELECT coalesce(json_object_agg(
               sk.id, json_build_object(
                 'quantity', sk.quantity,
                 'size', sk.size
                 )
            ), '{}')
          FROM skus as sk WHERE sk.style_id = s.id)
      ) ORDER BY s.id),'{}') AS results FROM styles as s WHERE s.product_id = ${id})

        FROM styles as s WHERE s.product_id = ${id}`, (err, data) => {
      if (err) {
        // console.log('err in model.js');
        callback(err);
      } else {
        callback(null, data);
      }
    });
  },
};

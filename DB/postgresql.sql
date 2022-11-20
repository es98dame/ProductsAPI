DROP DATABASE IF EXISTS atelier;
-- create db
CREATE DATABASE atelier;

-- use database command
\c atelier;

DROP TABLE IF EXISTS products, features, styles, photos, skus;

-- create tables
CREATE TABLE products(
   id SERIAL PRIMARY KEY     NOT NULL,
   name           VARCHAR(50)    NOT NULL,
   slogan            TEXT,
   description        TEXT,
   category         VARCHAR(50) NOT NULL,
   default_price        decimal(12,2)
);

CREATE TABLE features (
 id SERIAL PRIMARY KEY NOT NULL,
 product_id INTEGER NOT NULL,
 feature VARCHAR(50) NOT NULL,
 value VARCHAR(50),
 CONSTRAINT fk_product
      FOREIGN KEY(product_id)
	  REFERENCES products(id)
);

CREATE TABLE styles (
 id SERIAL PRIMARY KEY NOT NULL,
 product_id INTEGER NOT NULL,
 name VARCHAR(50),
 sale_price decimal(12,2) DEFAULT 0,
 original_price decimal(12,2) NOT NULL,
 default_style BOOLEAN NOT NULL,
 CONSTRAINT fk_product
      FOREIGN KEY(product_id)
	  REFERENCES products(id)
);

CREATE TABLE photos (
 id SERIAL PRIMARY KEY,
 style_id INTEGER,
 url TEXT,
 thumbnail_url TEXT,
 CONSTRAINT fk_styles
      FOREIGN KEY(style_id)
	  REFERENCES styles(id)
);

CREATE TABLE skus (
 id SERIAL PRIMARY KEY NOT NULL,
 style_id INTEGER,
 size VARCHAR(50) NOT NULL,
 quantity INTEGER NOT NULL,
 CONSTRAINT fk_styles
      FOREIGN KEY(style_id)
	  REFERENCES styles(id)
);

-- ELT ---
-- Import data if have .csv files.
-- \copy products FROM './Data/product.csv' csv header;
-- \copy features FROM './Data/features.csv' csv header;
-- \copy styles FROM './Data/styles.csv' NULL AS 'null' csv header;
-- \copy photos FROM './Data/photos.csv' csv header;
-- \copy skus FROM './Data/skus.csv' csv header;
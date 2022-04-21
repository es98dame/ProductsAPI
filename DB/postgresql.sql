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
 value VARCHAR(50)
);

CREATE TABLE styles (
 id SERIAL PRIMARY KEY NOT NULL,
 product_id INTEGER NOT NULL,
 name VARCHAR(50),
 sale_price decimal(12,2) DEFAULT 0,
 original_price decimal(12,2) NOT NULL,
 default_style BOOLEAN NOT NULL
);

CREATE TABLE photos (
 id SERIAL PRIMARY KEY,
 style_id INTEGER,
 url TEXT,
 thumbnail_url TEXT
);

CREATE TABLE skus (
 id SERIAL PRIMARY KEY NOT NULL,
 style_id INTEGER,
 size VARCHAR(50) NOT NULL,
 quantity INTEGER NOT NULL
);


\copy products FROM 'SDC-Overview/Data/product.csv' csv header;
\copy features FROM 'SDC-Overview/Data/features.csv' csv header;
\copy styles FROM 'SDC-Overview/Data/styles.csv' NULL AS 'null' csv header;
\copy photos FROM 'SDC-Overview/Data/photos.csv' csv header;
\copy skus FROM 'SDC-Overview/Data/skus.csv' csv header;
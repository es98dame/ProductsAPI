# Local Postgres Database set up

 1. In the root directory, run `mkdir Data`
    1. in the Data folder ensure these files exist:
       1. product.csv
          1. `id,name,slogan,description,category,default_price`
       2. features.csv
          1. `product_id,feature,value`
       3. styles.csv
          1. `id,product_id,name,sale_price,original_price,default_style`
       4. photos.csv
          1. `style_id,url,thumbnail_url`
       5. skus.csv
          1. `id,style_id,size,quantity`

2. For ELT process, Uncomment the ELT part in postgresql.sql and save it.
3. Run postgresql.sql in postgres
```sh
psql -h <hostname> -U postgres -f '<path_to_postgresql.sql>'
```

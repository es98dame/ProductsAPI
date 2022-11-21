# Products API
It is to build the backend system and APIs for products microservice for an e-commerce web app. It responds to several RESTful endpoints and has been optimized to handle web-scale traffic. Also, It supports building local and remote databases and provides schemas for both MongoDB and Postgres. 

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white "NodeJS")
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white "Express")
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

Table of Contents:
- [Get Started](#get-started)
- [Database](#database)
- [API Endpoint](#api-endpoint)
- [Docker](#docker)

## Get started
The database schema are contained in `/DB`
The node server is contained entirely in `/server` and enters on `index.js`
`npm test` runs the tests inside of the `/Test` folder with k6

#### Install
For local database setup, check it out. - [DB setup](https://github.com/es98dame/ProductsAPI/blob/main/DB/REAMD.md)

```
npm install
```

copy `example.env` to `.env` and configure the variables within.

## Run the App

```
npm start
```

## Run the Tests

```
npm test
```

[(Back to top)](#products-api)


## Database
### ER Diagram
<img src="https://user-images.githubusercontent.com/25275753/202879389-b8c4523b-dbf5-43da-a085-2d5cb7f56537.png"  width="500" height="400"/>

### DB Query
#### Products pagination
```sql 
SELECT * FROM products ORDER BY id ASC LIMIT ${count} OFFSET ${page}
```
#### Product features
```sql 
SELECT p.*, json_agg(json_build_object(
      'feature', f.feature,
      'value', f.value
  )) AS features
    FROM products as p JOIN features as f
    ON f.product_id = p.id WHERE p.id = ${id} GROUP BY p.id
```
#### Product styles
```sql
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
      FROM styles as s WHERE s.product_id = ${id}
  ```
  <img src="https://user-images.githubusercontent.com/25275753/202880552-d4b66d03-650b-4d46-921d-2721462fd4da.png"  width="500" height="400"/>
  
[(Back to top)](#products-api)

 
## API Endpoint
### `GET /products`
Retrieve a list of products. for paginaton, add parameters on URL like ?page=${page}&count=${count}`

#### Parameters
| Parameter | Type    | Description                                               |
|-----------|---------|-----------------------------------------------------------|
| page      | Integer | Selects the page of results to return. Default 1.         |
| page_size | Integer | Specifies how many results per page to return. Default 20.|

#### Response
```json
[
    {
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": 140
    },
    {
        "id": 2,
        "name": "Bright Future Sunglasses",
        "slogan": "You've got to wear shades",
        "description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
        "category": "Accessories",
        "default_price": 69
    },
    {
        "id": 3,
        "name": "Morning Joggers",
        "slogan": "Make yourself a morning person",
        "description": "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
        "category": "Pants",
        "default_price": 40
    }
]
```

### `GET /products/:product_id`
Returns all product level information for a specified product id.

#### Parameters
| Parameter  | Type    | Description                                       |
|------------|---------|---------------------------------------------------|
| product_id | Integer | Required ID of the product for which data should be returned. |

#### Response
```json
{
    "id": 1,
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": 140,
    "features": [
        {
            "feature": "Buttons",
            "value": "Brass"
        },
        {
            "feature": "Fabric",
            "value": "Canvas"
        }
    ]
}
```

### `GET /products/:product_id/styles`
Returns the all styles available for the given product.

#### Parameters
| Parameter  | Type    | Description                                       |
|------------|---------|---------------------------------------------------|
| product_id | Integer | Required ID of the product for which data should be returned |

#### Response
```json
{
    "product_id": "1",
    "results": [
        {
            "style_id": 1,
            "name": "Forest Green & Black",
            "original_price": 140,
            "sale_price": null,
            "default?": true,
            "photos": [
                {
                    "url": "placeholder/image.jpg",
                    "thumbnail_url": "placeholder/image_thumbnail.jpg"
                },
                {
                    "url": "placeholder/image.jpg",
                    "thumbnail_url": "placeholder/image_thumbnail.jpg"
                }
            ],
            "skus": {
                "1": {
                    "quantity": 8,
                    "size": "XS"
                },
                "2": {
                    "quantity": 16,
                    "size": "S"
                }
            }
        },
        {
            "style_id": 2,
            "name": "Desert Brown & Tan",
            "original_price": 140,
            "sale_price": null,
            "default?": false,
            "photos": [
                {
                    "url": "placeholder/image.jpg",
                    "thumbnail_url": "placeholder/image_thumbnail.jpg"
                },
                {
                    "url": "placeholder/image.jpg",
                    "thumbnail_url": "placeholder/image_thumbnail.jpg"
                }
            ],
            "skus": {
                "7": {
                    "quantity": 16,
                    "size": "S"
                },
                "8": {
                    "quantity": 8,
                    "size": "XS"
                }
            }
        }
    ]
}
```

[(Back to top)](#products-api)



## Docker

If want change this params in `docker-compose.yaml`
| Parameter | Description |
| ------ | ------ |
| POSTGRES_USER | The Postgres user to connect **postgres** |
| POSTGRES_PASSWORD | The Postgres password to connect **postgres** |
| POSTGRES_DB | The Postgres database name to connect **postgres** |
| port | The port mapped by Postgres is **5432** in your container. In this example, use the port **5438** on the host machine |

## Run
```sh
$ docker-compose up
```




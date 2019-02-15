#### Thoughts

+ Initialize an NPM project.
+ Add Express, Postgres, ...
+ Make HTTP description for HTTP resources regarding shoe size and calculation of current `TrueToSizeCalculation`.
    + It needs to be able to minimally accept an integer between 1 and 5; 1 being smallest and 5 being largest.
    + `TrueToSizeCalculation = average of the true to size entries for a given shoe.`
+ Dockerize it to keep the environment reproducible.
+ Test the routes.
+ The Docker container for the Postgres database isn't using a volume from the host machine. So data will be deleted 
  when the container dies.
+ ...

##### Initial HTTP API Description

```
POST /catalog/shoes/:shoe/true_to_size_calculation
content-type:application/x-www-form-urlencoded

size=5

POST /catalog/shoes/:shoe/true_to_size_calculation
content-type:application/json

{"size":5}

GET /catalog/shoes/:shoe/true_to_size_calculation

POST /catalog/shoes
content-type:application/x-www-form-urlencoded

name=adidas%20Yeezy

POST /catalog/shoes
content-type:application/json

{"name":"adidas Yeezy"}
```

##### Real Time Database Inspection

```
catalog=# SELECT * FROM shoes;
 id |     name
----+--------------
  1 | adidas Yeezy
(1 row)

catalog=# SELECT * FROM shoes_true_to_size_data;
 id |     name     | true_to_size
----+--------------+--------------
  1 | adidas Yeezy |            1
  2 | adidas Yeezy |            2
  3 | adidas Yeezy |            2
  4 | adidas Yeezy |            3
  5 | adidas Yeezy |            2
  6 | adidas Yeezy |            3
  7 | adidas Yeezy |            2
  8 | adidas Yeezy |            2
  9 | adidas Yeezy |            3
 10 | adidas Yeezy |            4
 11 | adidas Yeezy |            2
 12 | adidas Yeezy |            5
 13 | adidas Yeezy |            2
 14 | adidas Yeezy |            3
(14 rows)
```

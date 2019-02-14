#### Thoughts

+ Initialize an NPM project.
+ Add Express, Postgres, ...
+ Make HTTP description for HTTP resources regarding shoe size and calculation of current `TrueToSizeCalculation`.
    + It needs to be able to minimally accept an integer between 1 and 5; 1 being smallest and 5 being largest.
    + `TrueToSizeCalculation = average of the true to size entries for a given shoe.`
+ Dockerize it to keep the environment reproducible.
+ Test the routes.
+ ...

##### Initial API Description
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

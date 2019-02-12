### StockX - Software Engineer Coding Challenge

A large number of sales on StockX are sneakers.
However, not all sneakers fit the same (e.g., adidas Yeezys run a size small, therefore, if you are typically a size 9,
you would buy a size 10 Yeezy). In other words, shoes are not always “true-to-size”.
True-to-size​ refers to whether or not a shoe fits as expected for a given size.
True shoe sizes are measured using the Brannock device, the number shown on that device next to your toe is your true 
shoe size. What we are interested in is letting a user know how the shoe fits based on data collected through 
crowdsourcing. For this project, crowdsourcing can be you posting data to your program, repeatedly.

Your goal is to create a service, preferably written in Node.js or a language you are confident in, that will accept new
true-to-size data through the Hypertext Transfer Protocol (HTTP) and store this data in a relational database, 
preferably Postgres. Additionally, this service should be able to return a shoe’s TrueToSizeCalculation,
defined below, through an HTTP request. True to size entries range between 1 and 5, inclusive, 
where 1: really small, 2: small, 3: true to size, 4: big and 5: really big.

```
TrueToSizeCalculation = average of the true to size entries for a given shoe
```

**Note:** There is an example on the following page.

**Some things to know:**

+ If for some reason you get stumped, feel free to email me for assistance.
+ This exercise is not meant to be stressful or cut-throat so do your best.
+ Do not worry about whether the data you are “crowdsourcing” is correct in the real world,
i.e., in this example, your data might show that an adidas Yeezy fits too small. What you should focus on is ensuring that your program is able to calculate the appropriate true to size metric for an arbitrary set of true-to-size data.
+ Also, this should be able to be run on any engineer’s local machine, this includes the database. In order to make this possible, please document the necessary steps to get your service and the necessary technologies running locally.
+ While it is not a requirement, one way to ensure a system behaves as expected on many machines is to containerize the system. One technology for doing this is Docker.

If you have any questions, do not hesitate to email me at [miles@stockx.com](mailto:miles@stockx.com).

Thanks!

**Miles Muslin**


#### Example:

+ **Shoe:** adidas Yeezy
+ **True to size data:** 1, 2, 2, 3, 2, 3, 2, 2, 3, 4, 2, 5, 2, 3
+ **True to size calculation:** 2.5714285714286

If we add another data point, 2, to the collected data, our calculation should reflect this change.

+ **Shoe:** adidas Yeezy
+ **True to size data:** 1, 2, 2, 3, 2, 3, 2, 2, 3, 4, 2, 5, 2, 3, 2
+ **True to size calculation:** 2.5333333333333



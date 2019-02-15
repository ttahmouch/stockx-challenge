#### Getting Started On A Mac

0. Ensure you [install Docker for Mac](https://docs.docker.com/docker-for-mac/install/).
0. Ensure you [install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
0. Clone the StockX-Challenge application repository, 
   i.e., `git clone https://github.com/ttahmouch/stockx-challenge.git`.
0. Change into the StockX-Challenge working directory, i.e., `cd stockx-challenge`.
0. Launch the StockX-Challenge application and Postgres database Docker containers,
   i.e., `docker-compose build && docker-compose up`. You will need to `docker-compose build` if you make changes to the
   StockX-Challenge application as the directory is copied to the Docker image when a `build` takes place.
    + For more information on using Docker for Mac, please see [here](https://docs.docker.com/docker-for-mac/).
0. Finally, you should be able to navigate to `http://127.0.0.1:8080/` in your web browser, and start using the
   StockX-Challenge application.

#### Notes

##### Docker

+ Docker Compose will create two Docker images from `docker-compose.yml`, i.e., `stockx-challenge` and `postgres`, when
  you `docker-compose build`.
+ Docker Compose will create two Docker containers from images created using `docker-compose.yml` when you
  `docker-compose up`. The `stockx-challenge` container
  [depends on](https://docs.docker.com/compose/compose-file/#depends_on) the `postgres` container. That means the
  `postgres` container will be started before the `stockx-challenge` container on `docker-compose up`.
+ Currently, both containers are set to `always` restart when their respective entry point application crashes.
+ The `stockx-challenge` application container maps its port `8080` to port `8080` of the host machine for exposing the
  HTTP server, and port `9229` for exposing the Node Inspector for debugging.
+ The `postgres` database container maps its port `5432` to port `5432` of the host machine for exposing the database.
+ All the containers are exposed to each other in a Docker Compose Network capable of establishing connections to each
  other on their container ports. There is no need to communicate with the host machine to communicate between each
  other. They can address each other with hostnames equivalent to their service names in the `docker-compose.yml` file,
  e.g., `postgres` instead of `postgresql://...`.
+ The default database name with the image is started will be `catalog`, and the credentials of the super user in the
  container will be `postgres:postgres`, as that's what they are set to in `docker-compose.yml`.
+ When the Docker images are built, the `stockx-challenge` image uses the `Dockerfile` at the root of the project, and
  the `postgres` image uses the `Dockerfile` in the `database/` directory.
+ Whenever the `stockx-challenge` image is rebuilt, `package*.json` files are copied in to the applications working
  directory in the image, and the dependencies are installed from scratch using `npm install`. Then all the project
  files are copied into the working directory except for the `node_modules/` directory as to not clobber the
  dependencies that were just installed. The `node_modules/` directory is deliberately ignored in the `.dockerignore`
  file at the root of the project. Finally, the Node.js application is launched from its entry point, `index.js`, using
  `npm start` when the container is started.
+ Whenever the `postgres` image is rebuilt, initialization scripts for the Postgres database are added to the
  `/docker-entrypoint-initdb.d/` directory in the container. They can be found in `database/docker-entrypoint-initdb.d`.
  The initialization script, `index.sql`, grants the `postgres` all privileges to the `catalog` database and creates two
  tables in the database, i.e., `shoes` for storing shoe resources, and `shoes_true_to_size_data` for storing
  True-To-Size data for each shoe resource.
+ Currently, there is no data volume being used on the host machine for data stored within the `postgres` database
  container. This means whenever the database container is killed all of its persisted data goes with it. This is the
  nature of containers being implicitly ephemeral. This can be modified to persist the data in a volume.

##### Node

+ When the `stockx-challenge` application is running, it serves static files from the `static/` directory. This includes
  the entry point web page to use as a client for the HTTP API. The client currently allows you to:
    + create a shoe resource in the Postgres database, i.e., `adidas Yeezy`.
    + create a true-to-size calculation for a shoe resource, i.e., `adidas Yeezy`.
    + retrieve a true-to-size calculation for a shoe resource, i.e., `adidas Yeezy`. 
+ When the `stockx-challenge` application launches, it listens on a host and port, and establishes a connection with the
  Postgres database container, using the connection information declaratively specified in `configuration.json`.
+ The connection to the database is passed through middleware using `res.locals.database` to allow all incoming requests
  to use the existing connection and not have to reestablish a connection whenever a query is needed.
+ Most middleware is defined in `middleware/`. This currently includes middleware for responding with content
  negotiation using `res.locals.sendResponse`, responding before any routes are reached if request or response media
  types aren't supported by the HTTP API, and having a catch-all response for internal service errors.
+ Resources that are parameterized in the URI routes are defined in `params/`. This allows for checking if resources
  exist in the Postgres database before HTTP API routes are reached, and return resource not found early if they aren't.
+ Finally, routes are defined in `routes/`. There are currently routes for creating a shoe resource, creating a
  true-to-size calculation for a shoe resource, or retrieving a true-to-size calculation for a shoe resource.
    + If any route requires a request payload, and the payload is well-formed but doesn't have the proper semantics
      needed for the route, e.g., a JSON shoe resource representation is valid JSON but doesn't contain a proper `name`
      property, then an unprocessable entity response is sent.
    + If any route creates a resource, it returns a created response with a location header indicating where the
      resource may be retrieved in a follow-up request.

GRANT ALL PRIVILEGES ON DATABASE catalog TO postgres;
CREATE TABLE shoes (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL
);
CREATE TABLE shoes_true_to_size_data (
    id serial PRIMARY KEY,
    name varchar(100) NOT NULL,
    true_to_size smallint NOT NULL
);

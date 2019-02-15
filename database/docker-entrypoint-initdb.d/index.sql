GRANT ALL PRIVILEGES ON DATABASE catalog TO postgres;
CREATE TABLE IF NOT EXISTS shoes (
    id serial PRIMARY KEY,
    name text NOT NULL
);
CREATE TABLE IF NOT EXISTS shoes_true_to_size_data (
    id serial PRIMARY KEY,
    name text NOT NULL,
    true_to_size smallint NOT NULL
);

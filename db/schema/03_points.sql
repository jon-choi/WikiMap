DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE points (
  id SERIAL PRIMARY KEY,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description VARCHAR NOT NULL,
  latitude DECIMAL NOT NULL, -- double precison will round the value of lat and long since those values are longer
  longitude DECIMAL NOT NULL,
  image VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE points (
  id SERIAL PRIMARY KEY,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
<<<<<<< HEAD
  title VARCHAR(255) NOT NULL,
  description VARCHAR NOT NULL,
  latitude DECIMAL NOT NULL, -- double precison will round the value of lat and long since those values are longer
  longitude DECIMAL NOT NULL,
  image VARCHAR(255) NOT NULL
=======
  title VARCHAR(255) NOT NULL DEFAULT,
  description TEXT,
  latitude DOUBLE PRECISION, -- double precison will round the value of lat and long since those values are longer
  longitude DOUBLE PRECISION,
  image VARCHAR(255)
>>>>>>> d7580f00ea3d742accfc0e1d446a8eb45a261fd7
);

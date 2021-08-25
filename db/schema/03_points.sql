DROP TABLE IF EXISTS points CASCADE;

CREATE TABLE points (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL DEFAULT,
  description TEXT,
  latitude DOUBLE PRECISION, -- double precison will round the value of lat and long since those values are longer
  longitude DOUBLE PRECISION,
  image VARCHAR(255)
);

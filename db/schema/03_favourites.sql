DROP TABLE IF EXISTS favourites CASCADE;

CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
<<<<<<< HEAD:db/schema/03_favourites.sql
<<<<<<< HEAD:db/schema/02_favourites.sql
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
=======
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
>>>>>>> 41308cb38522ed6a6f21cd235b56a2d6f7d0c200:db/schema/03_favourites.sql
=======
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
>>>>>>> 41308cb38522ed6a6f21cd235b56a2d6f7d0c200:db/schema/03_favourites.sql
);

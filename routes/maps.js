const express = require('express');
const router = express.Router();
const json = require('body-parser/lib/types/json');
const {user} = require('pg/lib/defaults');

module.exports = (db) => {

  // GETS all maps
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM maps;`)
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // GETS particular map
  router.get("/:id", (req, res) => {
    const values = req.params.id;
    db.query(`SELECT * FROM maps
    WHERE id = $1;`, [values])
      .then(data => {
        const maps = data.rows[0];
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Creates new map
  router.post("/", (req, res) => {
    const { user_id, title, description } = req.body;
    db.query(`INSERT INTO maps (user_id, title, description)
    VALUES ($1, $2, $3) RETURNING *`, [user_id, title, description])
      .then(data => {
        const maps = data.rows[0];
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Return all points from a specific map
  router.get("/:id/points", (req, res) => {
    const values = req.params.id;
    db.query(`SELECT * FROM points
    WHERE map_id = $1`, [values])
      .then(data => {
        const maps = data.rows;
        res.json({ maps });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Creates new points
  router.patch("/:id", (req, res) => {
    const { title, description, image, latitude, longitude, id } = req.body;
    const query = `UPDATE points SET title = $1, description = $2, image = $3, latitude = $4, longitude = $5
    WHERE map_id = $6  AND id = $7 RETURNING *;`;
    db.query(query, [title, description, image, latitude, longitude, req.params.id, id])
    .then(data => {
      const maps = data.rows[0];
      res.json({ maps });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  // Deletes a map
  router.delete("/:id/delete", (req, res) => {
    const values = req.params.id;
    db.query(`DELETE FROM maps WHERE id = $1`, [values])
      .then(data => {
        res.json({ success: true });
      })
      .catch(err => {
        res
          .status(500)
          .json({ success: false, error: err });
      });
  });

  // Edits a point
  router.put("/:id", (req, res) => {
    const values = req.params.id;
    const { title, description, image, latitude, longitude } = req.body;
    const query = `INSERT INTO points (title, description, image, latitude, longitude, map_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    db.query(query, [title, description, image, latitude, longitude, values])
    .then(data => {
      const maps = data.rows;
      res.json({maps});
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    });

  });


  return router;

};

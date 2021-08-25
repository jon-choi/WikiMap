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

  //Retrieve all points from a specific map
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

  // Creates new points for a specific map
  router.post("/:id", (req, res) => {
    const values = req.params.id;
    const points = req.body.points;
    const parsed = JSON.parse(points);
    const promises = [];

    for (const point of parsed) {
      const promise = db.query(`INSERT INTO points (map_id, title, description, latitude, longitude, image)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [values, point.title, point.description, point.latitude, point.longitude, point.image]);
      promises.push(promise);
    }
    Promise.all(promises)
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
  // router.post("/", function(req, res) {
  //   const {pointTitle, description} = req.body;
  //   pointQueries.createPoint(pointTitle, description)
  //     .then(() => {
  //       //res.redirect('/points');
  //       //res.json({ success: true });
  //       //res.cookie('user_id', 42);
  //       res.status(201).send();
  //     })
  //     .catch(err => {
  //       res.json({error: err.message});
  //     });
  // });
  // const helpers = require('../scripts/helpers');

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
  router.patch("/:id/edit", (req, res) => {
    const values = req.params.id;
    const { title, description, image, latitude, longitude, id } = req.body;
    const query = `UPDATE points SET title = $1,
    description = $2,
    image = $3,
    latitude = $4,
    longitude = $5
    WHERE map_id = $6 AND id = $7 RETURNING *;`;
    db.query(query, [title, description, image, latitude, longitude, values, id])
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

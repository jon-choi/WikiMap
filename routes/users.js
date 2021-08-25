/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/:id", (req, res) => {
    const values = req.params.id;
    db.query(`SELECT * FROM maps
    WHERE user_id = $1;`, [values])
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // GET displays user's favourite maps
  router.get("/:id/favourites", (req, res) => {
    const values = req.params.id;
    db.query(`SELECT * FROM favourites
    WHERE user_id = $1;`, [values])
      .then(data => {
        const favourites = data.rows;
        res.json({ favourites });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // ADDS new map into user's favourite maps -- does not work
  router.post("/:id/favourites", (req, res) => {
    const values = [req.params.id, req.body.map_id];
    db.query(`INSERT INTO favourites (user_id, map_id) VALUES ($1, $2)`, [values])
    .then(data => {
      const favourites = data.rows;
      res.json({ favourites });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  return router;

};

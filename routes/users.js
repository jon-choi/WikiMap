/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const values = req.params.id;
    db.query(`SELECT * FROM maps
    WHERE user_id = $1;`, [values])
    .then(data => {
      const users = data.rows;
      res.json({users});
    })
    .catch(err => {
      res.status(400).json({error: err.message});
    })
  });

  router.get('/:id/favourites', (req, res) => {
    const values = req.params.id;
    db.query(`SELECT * FROM favourites
    WHERE user_id = $1;`, [values])
    .then(data => {
      const faves = data.rows;
      res.json({faves});
    })
    .catch(err => {
      res.status(400).json({error: err.message});
    });
  });

  return router;
};


// do this instead Andy ask to do this
// app.get('/login/:id', (req, res) => {
//   req.session.user_id = req.params.id;
//   res.redirect('/');
// });

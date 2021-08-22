const express = require('express');
const router = express.Router();
const {user} = require('pg/lib/defaults');
const json = require('body-parser/lib/types/json');


//GET /maps
module.exports = (db) => {

  // GET REQUEST FOR ALL MAPS
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM maps;`)
    .then(data => {
      const maps = data.rows;
      res.json({maps});
    })
    .catch(err => {
      res.status(400).json({error: err.message});
    });
  });

  // GET REQUEST FOR A PARTICULAR MAP
  router.get('/:id', (req, res) => {
    const values = req.params.id;
    db.query(`SELECT * FROM maps
    WHERE id = $1;`, [values])
    .then(data => {
      const maps = data.rows[0];
      res.json({maps})
    })
    .catch(err => {
      res.status(400).json({error: err.message});
    });
  });

  // POST REQUEST TO CREATE A NEW MAP
  router.post('/', (req, res) => {
    const {user_id, title, description} = req.body;
    db.query(`INSERT INTO maps (user_id, title, description)
    VALUES ($1, $2, $3)
    RETURNING *`, [user_id, title, description])
    .then(data => {
      const maps = data.rows[0];
      res.json({maps});
    })
    .catch(err => {
      res.status(400).json({error: err.message});
    });
  });

  // GET ALL POINTS FROM A PARTICULAR MAP
  router.get('/:id/points', (req, res) => {
    const values = req.params.id;
    db.query(`SELECT * FROM points
    WHERE map_id = $1`, [values])
    .then(data => {
      const maps = data.rows;
      res.json({maps});
    })
    .catch(err => {
      res.status(400).json({error: err.message});
    });
  });
  return router;
}

const express = require('express');
const router = express.Router();
const { getMapById, getMaps } = require('../db/map-queries');

//GET /maps
router.get('/', (req, res) => {
  getMaps()
    .then((maps) => {
      res.json(maps);
    });
});

// router.get('/map', (req, res) => {
//   res.render('../views/map');
// });

//GET /maps/:map_id
router.get('/:map_id', (req, res) => {
  getMapById(req.params.map_id)
    .then((map) => {
      res.json(map);
    })
});

module.exports = router;

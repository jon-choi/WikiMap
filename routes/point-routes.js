const express = require('express');
const router = express.Router();
const { getPointById, getPoints } = require('../db/point-queries');
//getPointById,

//GET /points
router.get('/', (req, res) => {
  getPoints()
    .then((points) => {
      res.json(points);
    });
});

router.get('/', (req, res) => {
  getMaps()
    .then((maps) => {
      res.json(maps);
    });
});

//GET /points/:point_id
router.get('/:point_id', (req, res) => {
  getPointById(req.params.point_id)
    .then((point) => {
      res.json(point);
    })
});

module.exports = router;


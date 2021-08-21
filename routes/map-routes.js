const express = require('express');
const router = express.Router();
const { getMaps } = require('../db/map-queries');

//GET /maps
router.get('/', (req, res) => {
  getMaps()
    .then((maps) => {
      res.json(maps);
    });
});

//GET /maps/:map_id
// router.get(`/:map_id`, (req, res) => {
//   getMapById()
//     .then((map_id) => {
//       res.json(map_id);
//     })
// })

module.exports = router;

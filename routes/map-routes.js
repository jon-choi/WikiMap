const express = require('express');
const router = express.Router();
const mapQueries = require('../db/map-queries');

router.get('/', (req, res) => {
    mapQueries.getMaps()
      .then((maps) => {
        res.json(maps);
      })
      .catch(err => {
        res.json({error: err.message});
      });
  });


//GET /maps/:map_id
// router.get('/:map_id', (req, res) => {
//   mapQueries.getMapById(req.params.map_id)
//     .then((map) => {
//       res.json(map);
//     })
//     .catch(err => {
//       res.json({error: err.message});
//     });
// });

router.get('/:map_id', (req, res) => {
  mapQueries.getPointsById(req.params.map_id)
      .then((points) => {
      res.json(points)
    })
    .catch(err => {
      res.json({error: err.message});
    });
});


// POST /maps create map
router.post("/", function(req, res) {
  const {mapTitle, description} = req.body;
  mapQueries.createMap(mapTitle, description)
    .then(() => {
      //res.redirect('/maps');
      //res.json({ success: true });
      //res.cookie('user_id', 42);
      res.status(201).send();
    })
    .catch(err => {
      res.json({error: err.message});
    });
});

// POST /maps/:id
router.patch('/:id', (req, res) => {
  console.log("--------------");
  const {mapTitle, description} = req.body;
  console.log(req.body);
  mapQueries.updateMap(req.params.id, mapTitle, description)
    .then(() => {

      // res.redirect(`/products/${req.params.id}`);
      res.json({ success: true });
    })
    .catch(err => {
      res.json({error: err.message});
    });
});

// POST /mapss/:id/delete
router.post('/:id/delete', (req, res) => {
  mapQueries.deleteMap(req.params.id)
    .then(() => {
      // res.redirect('/maps');
      res.json({ success: true });
    })
    .catch(err => {
      res.json({error: err.message});
    });
});



module.exports = router;

const express = require('express');
const router = express.Router();
// const { getPointById, getPoints } = require('../db/point-queries');
const pointQueries = require('../db/point-queries');
//getPointById,

//GET /points
// router.get('/', (req, res) => {
//   getPoints()
//     .then((points) => {
//       res.json(points);
//     });
// });
router.get('/', (req, res) => {
    pointQueries.getPoints()
      .then((points) => {
        res.json(points);
      })
      .catch(err => {
        res.json({error: err.message});
      });
  });


//GET /points/:point_id
router.get('/:point_id', (req, res) => {
  pointQueries.getPointById(req.params.point_id)
    .then((point) => {
      res.json(point);
    })
    .catch(err => {
      res.json({error: err.message});
    });
});

// //GET /points index.html
// router.get('/', (req, res) => {
//   fetchPoints()
//     .then((points) => {
//       res.json(points);
//     });
// });


// POST /points create point
router.post('/', function(req, res) {
  const { pointTitle, description, latitude, longitude, image} = req.body;
  console.log("-----------req.body",req.body);
  pointQueries.createPoint(pointTitle, description, latitude, longitude, image)
    .then(() => {
      //res.redirect('/points');
      //res.json({ success: true });
      //res.cookie('user_id', 42);
      //res.status(401).send();
      res.json({ success: true });
    })

});

// POST /products/:id
router.patch('/:id', (req, res) => {
  console.log("--------------");
  const {pointTitle, description, latitude, longitude, image} = req.body;
  console.log(req.body);
  pointQueries.updatePoint(req.params.id, pointTitle, description, latitude, longitude, image)
    .then(() => {

      // res.redirect(`/products/${req.params.id}`);
      res.json({ success: true });
    })
    .catch(err => {
      res.json({error: err.message});
    });
});

// POST /pointss/:id/delete
router.post('/:id/delete', (req, res) => {
  pointQueries.deletePoint(req.params.id)
    .then(() => {
      // res.redirect('/Points');
      res.json({ success: true });
    })
    .catch(err => {
      res.json({error: err.message});
    });
});



module.exports = router;


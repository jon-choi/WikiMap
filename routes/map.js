const express = require('express');
const router = express.Router();


//GET /maps
router.get('/', (req, res) => {
  res.render('../views/map')
});



module.exports = router;

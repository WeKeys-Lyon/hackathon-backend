var express = require('express');
var router = express.Router();
var Trips = require('../data');

router.get('/', function(req, res) {
  trips.find().then(data => 
    res.json(data))
});

router.get('/:departure/:arrival/:date', function (req, res) {
  const { departure, arrival, date } = req.params;

  trips.find({ departure, arrival, date })
    .then(data => {
      if (data.length > 0) {
        res.json({ result: true, data });
      } else {
        res.json({ result: false, error: 'No trip found' });
      }
    })
});

module.exports = router;
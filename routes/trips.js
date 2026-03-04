var express = require('express');
var router = express.Router();
var Trips = require('../data');

router.get('/', (req, res) => {
  Trips.find().then(data => 
    res.json(data))
});

router.get('/request/:departure/:arrival/:date',  (req, res) => {
  let { departure, arrival, date } = req.params;

  departure = departure.slice(0,1).toUpperCase() + departure.slice(1).toLowerCase();
  arrival = arrival.slice(0,1).toUpperCase() + arrival.slice(1).toLowerCase();
  datereg = new RegExp(date, "gi")

  let result = [];
  Trips.filter(trajet => { (trajet.departure == departure && 
    trajet.arrival == arrival &&
    trajet.date['$date'].match(datereg)) && result.push(trajet)});
    
    (result.length > 0) ? res.status(200).send({ result: true, trips: result }) : res.status(200).send({ result: false, error: 'No trip found' });
  }
);

module.exports = router;
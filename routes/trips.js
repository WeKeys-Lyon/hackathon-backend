var express = require('express');
var router = express.Router();
var Trips = require('../data');

router.get('/', (req, res) => {
  Trips.find().then(data => 
    res.json(data))
});

router.get('/request/:departure/:arrival/:date',  (req, res) => {
  const { departure, arrival, date } = req.params;
 // On reçois une date => 2026-03-03, du coup il faut faire une regex sur la recheche de DATE 
 // ATTENTION Date est un sous document.
 // Modification des params departure et arrival en First Uppercase then lowercase
    console.log(Trips[0])
    let result = [];
  Trips.filter(trajet => { /* recherche / condition puis && result.push(trajet) */})
    
    if (result.length > 0) {
        res.status(200).send({ result: true, trips: result });
      } else {
        res.status(200).send({ result: false, error: 'No trip found' });
      }
    }
);

module.exports = router;
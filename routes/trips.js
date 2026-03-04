var express = require('express');
var router = express.Router();
var Trips = require('../data');
const {isUserExist} = require('../modules/users');
const User = require('../models/users');


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

router.post('/addtocart', async (req,res) => {
  //Ajout en BDD du trip choisi avec le cookie comme désignation de l'utilisateur
  //On check si l'utilisateur existe en BDD et on répond
  if (await isUserExist(req.body.cookie)) {
    //On ajoute en BDD le trip en chargeant l'utilisateur existant
    const utilisateur = await User.findOne({cookie: req.body.cookie});
    utilisateur.cart.push({
      departure: req.body.departure,
      arrival: req.body.arrival,
      date: req.body.date,
      price: req.body.price
    });
    utilisateur.save();

    return res.status(200).send({ result: true, log: 'L\'utilisateur existait déjà'});
  } else {
      //On ajoute en BDD l'utilisateur et le trip
    const newUser = new User({
      cookie: req.body.cookie,
      cart: {
      departure: req.body.departure,
      arrival: req.body.arrival,
      date: req.body.date,
      price: req.body.price       
      }
    })
    newUser.save()
    return res.status(200).send({result: false, log: 'L\'utilisateur n\'existait pas, il a été créé' })
  }

})
module.exports = router;
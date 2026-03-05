var express = require('express');
var router = express.Router();
var Trips = require('../data');
const {isUserExist, isBookExist, createMyBooking} = require('../modules/users');
const User = require('../models/users');
const mongoose = require('mongoose');


router.get('/request/:departure/:arrival/:date',  (req, res) => {
  /* res.setHeader('Access-Control-Allow-Origin', '*'); */

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
  res.setHeader('Access-Control-Allow-Origin', '*');
 
  //Ajout en BDD du trip choisi avec le cookie comme désignation de l'utilisateur
  //On check si l'utilisateur existe en BDD et on répond
  if (await isUserExist(req.body.cookie)) {
    //On ajoute en BDD le trip en chargeant l'utilisateur existant
    const utilisateur = await User.findOne({cookie: req.body.cookie});
    utilisateur.cart.push({
      trajet: req.body.trajet,
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

});

router.post('/addtobooking', async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  //On reçoit en body un simple ObjectID qui celui du sousdocument et le cookie de l'utilisateur
  //, et suppression du trip dans le cart
  
    //Ajout en BDD du trip qui est dans le cart vers Booking
    let book = await createMyBooking(req.body.cartId, req.body.cookie);
    if (book == false) {
      return res.status(200).send({result: false, log: 'Rien trouvé dans le Panier'}); 
    } else {
        if (!await isBookExist(book, req.body.cookie)) {
                const utilisateur = await User.findOne({cookie: req.body.cookie});
                utilisateur.booking.push(book);
                utilisateur.cart.pull(req.body.cartId);
                utilisateur.save()
          } else {
            return res.status(200).send({result: false, log: 'J\'ai déjà ce trajet dans le Booking'})
          }
        return res.status(200).send({result: true, log: 'j ai bien un résultat'});
      }
    }
    
);

router.post('/alltrips', async(req,res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Faire un appel Mongoose pour obtenir un tableau des trajets - très important prendre l'ObjectId du trajet
    let utilisateur = req.body.cookie;
    User.findOne({cookie: utilisateur}).then(data => {
        if (data.cart) {
          res.status(200).send({result: true, log: 'Voici les résultats', voyages: data.cart})
        } else if (data == null){
          res.status(200).send({result: false, log: 'utilisateur inconnu' })
        } else {
          res.status(200).send({result: true, log: 'J ai rien trouvé', voyages: 0})
        }
    })

})
module.exports = router;
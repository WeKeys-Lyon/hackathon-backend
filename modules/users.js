const User = require('../models/users');
const mongoose = require('mongoose');

function isUserExist(name) {
    return new Promise(resolve => {
        setTimeout(() => {
        resolve(User.findOne({cookie: name}).then(data =>  {
        if (data == null) {
            return false
        } else {
            return true
        }
    }));
        }, 1000);
    });
};

function isCartExist(objectId, name) {
    if (!objectId || !name) {return false};
    return new Promise(resolve => {
    setTimeout(() => {
    resolve(User.findOne({cookie: name, cart: { $elemMatch: {_id : objectId}}}).then(data =>  {
    if (data == null) {
        return false
    } else {
        return true
    }
    }));
    }, 1000);
    });
}

function isBookExist(object, name) {
    const {departure, arrival, date, price} = object;

    if (!object || !name) { return false};
    return new Promise(resolve => {
    setTimeout(() => {
    resolve(User.findOne({cookie: name, booking: { departure: departure, arrival: arrival, date: date, price: price}}).then(data =>  {
    if (data == null) {
        return false
    } else {
        return true
    }
    }));
    }, 1000);
    });
}

function createMyBooking(cartId, name) {
    //Va chercher le trajet en panier de l'utilisateur et le resors sous forme d'objet 
    return new Promise(resolve => {
    setTimeout(() => {
    resolve(User.aggregate([{
      "$match": {
        "cookie": name,
      }
    },{
      "$unwind" : "$cart"
    },{
      "$match": {
        "cart._id": new mongoose.Types.ObjectId(`${cartId}`)
      }
    }

    ]).then(result => {
        if (result[0]) {
            book = {
      trajet: result[0].cart.trajet,
      date: result[0].cart.date,
      price: result[0].cart.price
    };
    return book;
        } else {
    return false;
        }
        
    }));
    }, 1000);
    });
}

module.exports = {isUserExist, isCartExist, isBookExist, createMyBooking}
const User = require('../models/users');

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

module.exports = {isUserExist, isCartExist}
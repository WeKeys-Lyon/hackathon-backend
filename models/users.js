const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    trajet: {type: String, required: true},
    date: {type: Date, required: true},
    price: {type: Number, required: true}
});
const bookingSchema = mongoose.Schema({
    trajet: {type: String, required: true},
    date: {type: Date, required: true},
    price: {type: Number, required: true}
})
const userSchema = mongoose.Schema({
    cookie: {type: String, unique: true, required: true},
    cart: [cartSchema],
    booking: [bookingSchema],
});

const User = mongoose.model('users', userSchema);

module.exports = User;
const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    trajet: String,
    date: Date,
    price: Number
});
const bookingSchema = mongoose.Schema({
    trajet: String,
    date: Date,
    price: Number
})
const userSchema = mongoose.Schema({
    cookie: {type: String, unique: true},
    cart: [cartSchema],
    booking: [bookingSchema],
});

const User = mongoose.model('users', userSchema);

module.exports = User;
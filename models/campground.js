const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const campgroundSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String
});

module.exports = mongoose.model('Campground', campgroundSchema);
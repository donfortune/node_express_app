const mongoose = require('mongoose');

// create schema 
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'], //validator
        unique: true,
        trim: true
    },
    rating: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price'],
        min: [0, 'Price must be above 0']
    }
});

// create model from schema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
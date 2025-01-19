const mongoose = require('mongoose');

// create schema 
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'], //validator
        unique: true,
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price'],
        min: [0, 'Price must be above 0']
    },
    priceDiscount: {
        type: Number
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a summary']
    },
    description: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
        
    },
    startDate: [Date],
    
    

} , {
    toJSON: { virtuals: true }, // this will make sure that the virtual properties are shown in the output
    toObject: { virtuals: true } // this will make sure that the virtual properties are shown in the output
});

// virtual properties - these are properties that are not stored in the database but are calculated using some other values 
// e.g. durationWeeks

tourSchema.virtual('durationWeeks').get(function() {
    return this.duration / 7; 
}) 


// create model from schema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
const mongoose = require('mongoose')
const dotenv = require("dotenv")
dotenv.config({ path: './config.env' })
const app = require('./app')

dotenv.config({ path: './config.env' })

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose
    // .connect(process.env.DATABASE_LOCAL, { // .connect(DB, {)
    .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then((con) => {
    console.log(con.connections)
    console.log('DB connection successful')
})

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

// create document from model
// const testTour = new Tour({
//     name: 'The Forest Hiker',
//     rating: 4.7,
//     price: 497
// });
const testTour = new Tour({
    name: 'The Park Campers',
    price: 997
});

// save document to collection
testTour.save().then(doc => {
    console.log(doc)
}).catch(err => {
    console.log('Error:', err)
})

console.log(app.get('env')) //gets the environment variable
// console.log(process.env) //gets all the environment variables

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App is listening at port ${port}....`)
})


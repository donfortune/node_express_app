const fs = require('fs')
const Tour = require('../models/tourModel')

// const tours = JSON.parse(fs.readFileSync('/Users/mac/Natours-Nodejs/dev-data/data/tours-simple.json'))


// exports.checkId = ('id', (req, res, next, val) => {
//     console.log(`Tour id is: ${val}`)
//     const tour = tours.find(element => element.id === parseInt(req.params.id))
//     if (!tour) {
//         return res.status(404).json({
//             status: 'fail',
//             message: 'Invalid ID'
//         })
//     }
//     next()

// })

//craete a checkbody middleware
//check if body contains the nbame ad price property
//if not, send back 400(bad request)
// exports.checkBody = ('name', 'price', (req, res, next) => {
//     const { name, price } = req.body
//     console.log(`name is ${name} and price is ${price}`)
//     if (!name || !price) {
//         return res.status(400).json({
//             status: 'fail',
//             message: 'Missing name or price'
//         })
//     }
//     next()
    
    

// })
    


// Route Handlers
exports.getAllTours = async (req, res) => {
    try {
        const newTour = await Tour.find()
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: newTour.length,
            data: newTour
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}



exports.getTour = async (req, res) => {
    // console.log(req.params) 
    // const tour = tours.find(element => element.id === parseInt(req.params.id))
    // if (!tour) {
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid ID'
    //     })
    // }
    try {
        const tour = await Tour.findById(req.params.id)
        res.status(200).json({
            status: 'success',
            data: tour
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }

}

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body)
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }

    
}

exports.updateTour = (req, res) => {
    const tour = tours.find(element => element.id === parseInt(req.params.id))
    // if (!tour) {
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid ID'
    //     })
    // }
    updatedTour = Object.assign(tour, req.body);
    res.status(200).json({
        status: 'success',
        data: {
            updatedTour
        }
    })
}

exports.deleteTour = (req, res) => {
    const tour = tours.find(element => element.id === parseInt(req.params.id))
    
    const index = tours.indexOf(tour)
    console.log(index)
    tours.splice(index, 1)
    res.status(204).json({
        status: 'success',
        data: null
    })
}

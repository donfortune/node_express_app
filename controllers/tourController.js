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

exports.getFavoriteTours = (req, res, next) => {
    const limit = req.query.limit * 1 || 5
    req.query.limit = limit
    req.query.sort = '-ratingsAverage,price'
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
    next()
}

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
        //1.  FILTERING


        // Build a query
        console.log(req.query)
        console.log(req.query.sort)
        const queryObj = { ...req.query } //create a copy of the query object
        const excludeFields = ['page', 'sort', 'limit', 'fields'] //fields to exclude from the query
        excludeFields.forEach(el => delete queryObj[el]) //delete the  excluded fields from the query object
        // console.log(queryObj, req.query)
        // const tours = await Tour.find(queryObj)
        // const tours = await Tour.find(queryObj)
        // const tours = await Tour.find({
        //     duration: 5,
            // difficulty: 'easy'
        // })
        

        //2. ADVANCED FILTERING
        let queryStr = JSON.stringify(queryObj) // convert the query object to a string so we can manipulate it
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`) // replace the query object with the query object with the $ sign
        console.log(JSON.parse(queryStr)) // convert the string back to an object

        // Execute the query
        let query =  Tour.find(JSON.parse(queryStr)) // return a query object
        
        

        // { difficulty: 'easy', duration: { gte: '5' } }
        // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy')
        // const newTour = await Tour.find()

        //3. SORTING
        if (req.query.sort) {
            // query = query.sort(req.query.sort)
            // sort by multiple fields
            const sortBy = req.query.sort.split(',').join(' ')
            console.log(sortBy)
            query = query.sort(sortBy)
            
        } else {
            query = query.sort('-createdAt') // default sort behavior
        }

        // 4. LIMITING - allow user to limit the number of results
        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ')
            query = query.select(fields)
        } else {
            query = query.select('-__v') // exclude the __v field
        }

        // 5. PAGINATION
        // page=2&limit=10, 1-10, page 1, 11-20, page 2, 21-30
        // const page = parseInt(req.query.page) // convert the page number to an integer. the page number is the page to show
        // const limit = parseInt(req.query.limit) || 100 // convert the limit to an integer. the limit is the number of results to show per page
        // const skip = (page - 1) * limit
        // query = query.skip(10).limit(10)

        const page = req.query.page * 1 || 1 // convert the page number to an integer. the page number is the page to show
        const limit = req.query.limit * 1 || 100 // convert the limit to an integer. the limit is the number of results to show per page
        const skip = (page - 1) * limit
        query = query.skip(skip).limit(limit)

        if (req.query.page) {
            const numTours = await Tour.countDocuments()
            if (skip >= numTours) throw new Error('This page does not exist')
        }



        const newTour = await query 

        // Send response
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            results: newTour.length,
            data: newTour
        })
    } catch (err) {
        console.log(err)
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

exports.updateTour = async (req, res) => {
    // const tour = tours.find(element => element.id === parseInt(req.params.id))
    // if (!tour) {
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid ID'
    //     })
    // }
    // updatedTour = Object.assign(tour, req.body);
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id , req.body, {
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.deleteTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: 'success',
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
    // const tour = tours.find(element => element.id === parseInt(req.params.id))
    
    // const index = tours.indexOf(tour)
    // console.log(index)
    // tours.splice(index, 1)
    
}

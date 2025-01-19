const fs = require('fs')
const Tour = require('../models/tourModel')
const APIFeatures = require('../utils/apiFeatures')

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

// class ApiFeatures {
//     constructor(query, queryString){
//         this.query = query
//         this.queryString = queryString
//     }

//     filter() {
//         const queryObj = { ...this.queryString } //create a copy of the query object
//         const excludeFields = ['page', 'sort', 'limit', 'fields'] //fields to exclude from the query
//         excludeFields.forEach(el => delete queryObj[el]) //delete the  excluded fields from the query object
//         // console.log(queryObj, req.query)
//         // const tours = await Tour.find(queryObj)
//         // const tours = await Tour.find(queryObj)
//         // const tours = await Tour.find({
//         //     duration: 5,
//             // difficulty: 'easy'
//         // })
        

//         //2. ADVANCED FILTERING
//         let queryStr = JSON.stringify(queryObj) // convert the query object to a string so we can manipulate it
//         queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`) // replace the query object with the query object with the $ sign
//         console.log(JSON.parse(queryStr)) // convert the string back to an object

//         // Execute the query
//         this.query = this.query.find(JSON.parse(queryStr)) // return a query object
//         // let query =  Tour.find(JSON.parse(queryStr)) // return a query object

//         return this
//     }

//     sort() {
//         if (this.queryString.sort) {
//             // query = query.sort(req.query.sort)
//             // sort by multiple fields
//             const sortBy = this.queryString.sort.split(',').join(' ')
//             console.log(sortBy)
//             this.query = this.query.sort(sortBy)
            
//         } else {
//             query = query.sort('-createdAt') // default sort behavior
//         }

//         return this

//     }

//     limiting() {
//         if (this.queryString.fields) {
//             const fields = this.queryString.fields.split(',').join(' ')
//             this.query = this.query.select(fields)
//         } else {
//             this.query = this.query.select('-__v') // exclude the __v field
//         }

//         return this

//     }

//     paginate() {

//         const page = this.queryString.page * 1 || 1 // convert the page number to an integer. the page number is the page to show
//         const limit = this.queryString.limit * 1 || 100 // convert the limit to an integer. the limit is the number of results to show per page
//         const skip = (page - 1) * limit
//         this.query = this.query.skip(skip).limit(limit)
//         return this

//         // if (this.queryString.page) {
//         //     const numTours = await Tour.countDocuments()
//         //     if (skip >= numTours) throw new Error('This page does not exist')
//         // }

//     }

// }


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
exports.getAllTours = async (req, res, next) => {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  };
// exports.getAllTours = async (req, res) => {
//     try {
//         //1.  FILTERING


//         // Build a query
//         console.log(req.query)
//         console.log(req.query.sort)
//         // const queryObj = { ...req.query } //create a copy of the query object
//         // const excludeFields = ['page', 'sort', 'limit', 'fields'] //fields to exclude from the query
//         // excludeFields.forEach(el => delete queryObj[el]) //delete the  excluded fields from the query object
//         // // console.log(queryObj, req.query)
//         // // const tours = await Tour.find(queryObj)
//         // // const tours = await Tour.find(queryObj)
//         // // const tours = await Tour.find({
//         // //     duration: 5,
//         //     // difficulty: 'easy'
//         // // })
        

//         // //2. ADVANCED FILTERING
//         // let queryStr = JSON.stringify(queryObj) // convert the query object to a string so we can manipulate it
//         // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`) // replace the query object with the query object with the $ sign
//         // console.log(JSON.parse(queryStr)) // convert the string back to an object

//         // // Execute the query
//         // let query =  Tour.find(JSON.parse(queryStr)) // return a query object
        
        

//         // { difficulty: 'easy', duration: { gte: '5' } }
//         // const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy')
//         // const newTour = await Tour.find()

//         //3. SORTING
//         // if (req.query.sort) {
//         //     // query = query.sort(req.query.sort)
//         //     // sort by multiple fields
//         //     const sortBy = req.query.sort.split(',').join(' ')
//         //     console.log(sortBy)
//         //     query = query.sort(sortBy)
            
//         // } else {
//         //     query = query.sort('-createdAt') // default sort behavior
//         // }

//         // 4. LIMITING - allow user to limit the number of results
//         // if (req.query.fields) {
//         //     const fields = req.query.fields.split(',').join(' ')
//         //     query = query.select(fields)
//         // } else {
//         //     query = query.select('-__v') // exclude the __v field
//         // }

//         // 5. PAGINATION
//         // page=2&limit=10, 1-10, page 1, 11-20, page 2, 21-30
//         // const page = parseInt(req.query.page) // convert the page number to an integer. the page number is the page to show
//         // const limit = parseInt(req.query.limit) || 100 // convert the limit to an integer. the limit is the number of results to show per page
//         // const skip = (page - 1) * limit
//         // query = query.skip(10).limit(10)

//         // const page = req.query.page * 1 || 1 // convert the page number to an integer. the page number is the page to show
//         // const limit = req.query.limit * 1 || 100 // convert the limit to an integer. the limit is the number of results to show per page
//         // const skip = (page - 1) * limit
//         // query = query.skip(skip).limit(limit)

//         // if (req.query.page) {
//         //     const numTours = await Tour.countDocuments()
//         //     if (skip >= numTours) throw new Error('This page does not exist')
//         // }


//         // Execute the query
//         const features = new APIFeatures(Tour.find(), this.req.query)
//             .filter()
//             .sort()
//             .limitFields()
//             .paginate()
        
//         const tours = await features.query

//         // Send response
//         res.status(200).json({
//             status: 'success',
//             requestedAt: req.requestTime,
//             results: tours.length,
//             data: tours
//         })
//     } catch (err) {
//         console.log(err)
//         res.status(404).json({
//             status: 'fail',
//             message: err
//         })
//     }
// }





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

// Aggregation pipeline - used for processing data from collection(DB) to get aggregated results like averages, sums, etc

exports.getTourStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            }, // select only tours with ratingsAverage greater than or equal to 4.5
            {
                $group: {
                    // _id: null, // group all the selected tours
                    _id: { $toUpper: '$difficulty'}, // group the selected tours by difficulty
                    // numTours: { $sum: 1 },
                    // numRatings: { $sum: '$ratingsQuantity' },
                    numRatings: { $sum: '$ratingsQuantity' }, // calculate the number of ratings
                    numTours: { $sum: 1 }, // calculate the number of tours
                    avgRating: { $avg: '$ratingsAverage' }, // calculate the average rating
                    avgPrice: { $avg: '$price' }, // calculate the average price
                    minPrice: { $min: '$price' }, // calculate the minimum price
                    maxPrice: { $max: '$price' } // calculate the maximum price
                } // group the selected tours by difficulty and calculate the number of tours, number of ratings, average rating, average price, minimum price and maximum price
            },
            {
                $sort: { avgPrice: 1 } // sort the results by average price in ascending order
            }
            // {
            //     $match: { _id: { $ne: 'EASY' } } // exclude tours with difficulty of easy
            // }
        ])
        res.status(200).json({
            status: 'success',
            data: {
                stats
            }
        })
        
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: err 
        })
    }
}

// Using aggregation pipeline to solve real business problems - get the busiest month of the year

exports.getMonthlyPlan = async (req, res) => {
    try {
        const year = req.params.year * 1 // convert the year to a number
        console.log(year)
        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates' // deconstruct the startDate array and create a document for each element in the array
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`), // get all tours that start in the year
                        $lte: new Date(`${year}-12-31`) // get all tours that end in the year
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' }, // group the tours by month
                    numTourStarts: { $sum: 1 }, // count the number of tours that start in each month
                    tours: { $push: '$name' } // create an array of the names of tours that start in each month
                }
            },
            {
                $addFields: { month: '$_id' } // add a field called month to the results
            },
            {
                $project: {
                _id: 0 // exclude the _id field from the results
                }
            },
            {
                $sort: { numTourStarts: -1 } // sort the results by the number of tours that start in each month in descending order
            },
            {
                $limit: 6 // limit the results to 6
            }
        ])
        res.status(200).json({
            status: 'success',
            data: {
                plan
            }
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: err 
        })
    }
}
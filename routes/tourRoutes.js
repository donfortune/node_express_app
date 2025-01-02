const express = require('express')
const fs = require('fs')
const router = express.Router()

const tourController = require('./../controllers/tourController')

//param middleware
router.param('id', tourController.checkId)
// router.param('name', 'price', tourController.checkBody)

//craete a checkbody middleware
//check if body contains the nbame ad price property
//if not, send back 400(bad request)

// Routes
router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour)

// app.route('/api/v1/tours')
//     .get(getAllTours)
//     .post(createTour)

    
router
    .route('/:id')
    .get(tourController.getTour)
    .delete(tourController.deleteTour)
    .patch(tourController.updateTour)

// app.route('/api/v1/tours/:id')
//     .get(getTour)
//     .delete(deleteTour)
//     .patch(updateTour)

module.exports = router
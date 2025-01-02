const fs = require('fs')

const tours = JSON.parse(fs.readFileSync('/Users/mac/Natours-Nodejs/dev-data/data/tours-simple.json'))

exports.checkId = ('id', (req, res, next, val) => {
    console.log(`Tour id is: ${val}`)
    const tour = tours.find(element => element.id === parseInt(req.params.id))
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    next()

})

//craete a checkbody middleware
//check if body contains the nbame ad price property
//if not, send back 400(bad request)
exports.checkBody = ('name', 'price', (req, res, next) => {
    const { name, price } = req.body
    console.log(`name is ${name} and price is ${price}`)
    if (!name || !price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    }
    next()
    
    

})
    


// Route Handlers
exports.getAllTours = (req, res) => {
    // res.send('This is the home page')
    // res.json({message: 'Hello from the server side!.'})
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: tours
    })
}



exports.getTour = (req, res) => {
    console.log(req.params) 
    const tour = tours.find(element => element.id === parseInt(req.params.id))
    // if (!tour) {
    //     return res.status(404).json({
    //         status: 'fail',
    //         message: 'Invalid ID'
    //     })
    // }
    res.status(200).json({
        status: 'success',
        // results: tours.length,
        data: tour
    })
}

exports.createTour = (req, res) => {
    // console.log(req.body)
    const newId = tours[tours.length - 1].id + 1 //
    const newTour = Object.assign({ id: newId}, req.body)

    tours .push(newTour)
    fs.writeFile('/Users/mac/Natours-Nodejs/dev-data/data/tours-simple.json', JSON.stringify(tours), (err) => {
        if (err) {

        }
        res.status(201).json({
            status: 'Success',
            data: {
                tour: newTour
            }
        })

    })
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

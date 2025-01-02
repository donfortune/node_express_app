const fs = require('fs')
const express = require('express')
const morgan = require('morgan')

const app = express()

// middleware
app.use(morgan('dev'))
app.use(express.json()) 

//own middleware
app.use((req, res, next) => {
    console.log('Hello from the middleware')
    next()
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    next()
})

// Top level code
const tours = JSON.parse(fs.readFileSync('/Users/mac/Natours-Nodejs/dev-data/data/tours-simple.json'))

const getAllTours = (req, res) => {
    // res.send('This is the home page')
    // res.json({message: 'Hello from the server side!.'})
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: tours
    })
}



const getTour = (req, res) => {
    console.log(req.params) 
    const tour = tours.find(element => element.id === parseInt(req.params.id))
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    res.status(200).json({
        status: 'success',
        // results: tours.length,
        data: tour
    })
}

const createTour = (req, res) => {
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

const updateTour = (req, res) => {
    const tour = tours.find(element => element.id === parseInt(req.params.id))
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    updatedTour = Object.assign(tour, req.body);
    res.status(200).json({
        status: 'success',
        data: {
            updatedTour
        }
    })
}

const deleteTour = (req, res) => {
    const tour = tours.find(element => element.id === parseInt(req.params.id))
    if (!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    const index = tours.indexOf(tour)
    console.log(index)
    tours.splice(index, 1)
    res.status(204).json({
        status: 'success',
        data: null
    })
}

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })

}

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })

}
const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })

}
const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })

}
const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet defined'
    })

}
//Define routes
// app.get('/api/v1/tours', getAllTours)

// app.get('/api/v1/tours/:id', getTour)

// app.post('/api/v1/tours', createTour)

// app.patch('/api/v1/tours/:id', updateTour)

// app.delete('/api/v1/tours/:id',deleteTour )

const tourRouter = express.Router()
const userRouter = express.Router()

tourRouter
    .route('/')
    .get(getAllTours)
    .post(createTour)

// app.route('/api/v1/tours')
//     .get(getAllTours)
//     .post(createTour)

    
tourRouter
    .route('/:id')
    .get(getTour)
    .delete(deleteTour)
    .patch(updateTour)

// app.route('/api/v1/tours/:id')
//     .get(getTour)
//     .delete(deleteTour)
//     .patch(updateTour)


userRouter
    .route('/')
    .get(getAllUsers)
    .post(createUser)

// app.route('/api/v1/users')
//     .get(getAllUsers)
//     .post(createUser)

userRouter
    .route('/:id')
    .get(getUser)
    .delete(deleteUser)
    .patch(updateUser)


app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

// app.route('/api/v1/users/:id')
//     .get(getUser)
//     .delete(deleteUser)
//     .patch(updateUser)



const port = 3000
app.listen(port, () => {
    console.log(`App is listening at port ${port}...`)
})




const express = require('express')
const router = express.Router()
const userController = require('/Users/mac/Natours-Nodejs/controllers/userController.js')


// Routes
router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

// app.route('/api/v1/users')
//     .get(getAllUsers)
//     .post(createUser)

router
    .route('/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser)
    .patch(userController.updateUser)




// app.route('/api/v1/users/:id')
//     .get(getUser)
//     .delete(deleteUser)
//     .patch(updateUser)

module.exports = router
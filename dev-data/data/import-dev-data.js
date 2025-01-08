const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require("dotenv")
// dotenv.config({ path: './config.env' })
const Tour = require('../../models/tourModel')



// dotenv.config({ path: './config.env' })

dotenv.config({ path: '/Users/mac/Natours-Nodejs/config.env' })

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

// Read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'))

// Import data into DB
const importData = async () => {
    try {
        await Tour.create(tours)
        console.log('Data successfully loaded')
        
    } catch (err) {
        console.log(err)
    }
    process.exit()
}

// Delete all data from DB
const deleteData = async () => {
    try {
        await Tour.deleteMany()
        console.log('Data successfully deleted')
        process.exit() 
    } catch (err) {
        console.log(err)
    }
    process.exit()
}

if (process.argv[2] === '--import') {
    importData()
    console.log('Data successfully loaded')
} else if (process.argv[2] === '--delete') {
    deleteData()
    console.log('Data successfully deleted')
}

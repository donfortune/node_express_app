
const dotenv = require("dotenv")
dotenv.config({ path: './config.env' })
const app = require('./app')


console.log(app.get('env')) //gets the environment variable
// console.log(process.env) //gets all the environment variables

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App is listening at port ${port}...`)
})

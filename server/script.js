const express = require('express')
const app = express()
const cors = require('cors')
const body_parser = require('body-parser')
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 4000
const db = require('./app/config/db_config') // database 
const router = require('./app/routes/routs')

app.use(cors())
app.use(body_parser.urlencoded({ extended: true }))
app.use(body_parser.json())

app.use(cookieParser())

app.use('/', router);


app.listen(PORT, () => console.log(`listening to port: ${PORT}`))
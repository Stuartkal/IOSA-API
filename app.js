require('dotenv-safe').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const userRoutes = require('./routes/user')
const breedRoutes = require('./routes/breed')

const errorHandler = (error, req, res, next) => {
    const { message, data, statusCode } = error
    return res.status(statusCode || 500).json({ message, data })
}

const app = express()

app.use(cors())
app.use(express.json())

app.use('/auth', userRoutes)
app.use('/breeds', breedRoutes)

app.use(errorHandler)

mongoose
    .connect(process.env.MONGO_DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then((result) => {
        app.listen(process.env.PORT || 8080)
        console.log(`App listening on http://localhost:${process.env.PORT}`)
    })

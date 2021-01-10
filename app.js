const express = require('express')

const mongoose = require('mongoose')
const cors = require('cors')


require('dotenv').config()

const userRoutes = require('./routes/user')
const breedRoutes = require('./routes/breed')


const app = express()

const corsConfig = {
    origin: ["http://testing.local", "https://my-movie-db-roberto.herokuapp.com", "http://localhost:3000"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    allowedHeaders: ['Content-Type']
}

app.use(cors(corsConfig))
app.use(express.json())


// app.use((req,res,next) => {
//     res.setHeader('Access-Control-Allow-Origin','*')
//     res.setHeader('Access-Control-Max-Age','*')
//     res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')
//     res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Authorization')
//     next()
// })

app.use('/auth',userRoutes)
app.use('/breeds',breedRoutes)


app.use((error,req,res,next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({ message:message, data:data })
})

mongoose.
connect(process.env.MONGO_DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(result => {
    app.listen(process.env.PORT || 8080)
})

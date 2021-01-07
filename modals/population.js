const mongoose = require('mongoose')

const Schema = mongoose.Schema

const populationSchema = new Schema({
    numberOfNewborns: {
        type: Number,
        required: true
    },
    numberOfDeaths: {
        type: Number,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Population',populationSchema)
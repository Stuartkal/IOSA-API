const mongoose = require('mongoose')

const Schema = mongoose.Schema

const populationSchema = new Schema(
    {
        year:{
            type: String,
            required: true
        },
        month: {
            type: String,
            required: true
        },
        recordDate: {
            type: String,
            required: true
        },
        numberOfFemales: {
            type: Number,
            required: true
        },
        numberOfMales: {
            type: Number,
            required: true
        },
        numberOfNewborns: {
            type: Number,
            required: true
        },
        numberOfDeathsInMonth: {
            type: Number,
            required: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Population', populationSchema)

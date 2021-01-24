const mongoose = require('mongoose')

const Schema = mongoose.Schema

const medicationSchema = new Schema({
        _medication: {
            type: String,
            required: true
        },
        medicationDate: {
            type: String,
            required: true
        },
        cageNumber: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true
        },
        medicationType: {
            type: String,
            required: true
        },
        remarks: {
            type: String,
            required: true
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true })

module.exports = mongoose.model('Medication',medicationSchema)
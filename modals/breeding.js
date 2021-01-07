const mongoose = require('mongoose')

const Schema = mongoose.Schema

const breedingSchema = new Schema({
    breed: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    parent: {
        type: String,
        required: true
    },
    femaleCageNumber: {
        type: Number,
        required: true
    },
    maleCageNumber: {
        type: Number,
        required: true
    },
    breedingDate: {
        type: String,
        required: true
    },
    kindlingBox: {
        type: String,
        required: true
    },
    kindlingDate: {
        type: String,
        required: true
    },
    numberAlive: {
        type: Number,
        required: true
    },
    numberDead: {
        type: Number,
        required: true
    },
    weaningDate: {
        type: String,
        required: true
    },
    nextBreedingDate: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model('Breeding',breedingSchema)
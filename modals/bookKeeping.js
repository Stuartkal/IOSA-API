const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bookKeepingSchema = new Schema(
    {
        food: {
            type: String,
            required: true,
        },
        medication: {
            type: String,
            required: true,
        },
        salaries: {
            type: String,
            required: true,
        },
        allowances: {
            type: String,
            required: true,
        },
        miscellaneous: {
            type: String,
            required: true,
        },
        animalsBought: {
            type: String,
            required: true,
        },
        rabbitSales: {
            type: String,
            required: true,
        },
        farmVisits: {
            type: String,
            required: true,
        },
        foodSales: {
            type: String,
            required: true,
        },
        stockFood: {
            type: String,
            required: true,
        },
        stockAnimals: {
            type: String,
            required: true,
        },
        stockMedication: {
            type: String,
            required: true,
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('BookKeeping', bookKeepingSchema)

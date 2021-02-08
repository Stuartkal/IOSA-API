const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        expenditure: {
            type: String,
            required: false
        },
        gross_revenue: {
            type: String,
            required: false
        },
        net_revenue: {
            type: String,
            required: false
        },
        breeding: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Breeding',
            },
        ],
        population: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Population',
            },
        ],
        medication: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Medication'
            }
        ],
        bookkeeping: [
            {
                type: Schema.Types.ObjectId,
                ref: 'BookKeeping',
            },
        ],
    },
    { timestamps: true }
)

module.exports = mongoose.model('Users', userSchema)

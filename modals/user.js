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

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const revenueShema = new Schema({
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
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

},{ timestamps: true })

module.exports = mongoose.model('Revenue',revenueShema)
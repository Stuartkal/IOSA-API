const mongoose = require('mongoose')

const Schema = mongoose.Schema

const notificationSchema = new Schema({
    notifications:[],
    notificationType:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Notifications',notificationSchema)
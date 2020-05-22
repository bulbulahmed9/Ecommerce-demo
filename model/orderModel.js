const mongoose = require('mongoose')

// User Schema
const userSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    orders: []
}, { timestamps: true })


module.exports = mongoose.model('Order', userSchema)
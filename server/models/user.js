const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
    userName: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String},
    email: { type: String},
})

// create model
const User = mongoose.model('User', userSchema)

module.exports = User
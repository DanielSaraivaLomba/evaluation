const mongoose = require('mongoose')
const Schema = mongoose.Schema

let docSchema = new Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    userName: { type: String, ref: 'User', required: true},
    year: { type: String },
    isCompleted: { type: Boolean, default: false }
})

// create model
const Doc = mongoose.model('Doc', docSchema)

module.exports = Doc


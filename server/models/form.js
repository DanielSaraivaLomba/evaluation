const mongoose = require('mongoose')
const Schema = mongoose.Schema

let formSchema = new Schema({
    docId: { type: mongoose.Schema.ObjectId, ref: 'Doc', required: true },
    activity: { type: String },
    answers: []
})

// create model
const Form = mongoose.model('Form', formSchema)
module.exports = Form
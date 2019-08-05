const mongoose = require('mongoose')
const Schema = mongoose.Schema

let table2Schema = new Schema({
    docId: { type: mongoose.Schema.ObjectId, ref: 'Doc', required: true },
    ano: { type: String },
    instituicao: { type: String },
    regime: { type: String },
    createdOn: { type: Date, default: Date.now },
})

// create model
const Table2 = mongoose.model('Table2', table2Schema)

module.exports = Table2

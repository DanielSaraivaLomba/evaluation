const mongoose = require('mongoose')
const Schema = mongoose.Schema

let table3Schema = new Schema({
    docId: { type: mongoose.Schema.ObjectId, ref: 'Doc', required: true },
    curso: { type: String },
    unidadecurricular: { type: String },
    regime: { type: String },
    avaliacao: { type: String },
    createdOn: { type: Date, default: Date.now },
})

// create model
const Table3 = mongoose.model('Table3', table3Schema)

module.exports = Table3

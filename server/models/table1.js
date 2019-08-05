
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let table1Schema = new Schema({
    docId: { type: mongoose.Schema.ObjectId, ref: 'Doc', required: true },
    unidadecurricular: { type: String },
    ano: { type: String },
    curso: { type: String },
    regime: { type: String },
    semestre: { type: String },
    horastotal: { type: String },
    horaslecionadas: { type: String },
    horassemana: { type: String },
    nestudantes: { type: String },
    createdon: { type: Date, default: Date.now }
})


const Table1 = mongoose.model('Table1', table1Schema)

module.exports = Table1
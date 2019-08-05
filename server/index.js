const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const api = require('./api')
const fileUpload = require('express-fileupload');

const app = express()
//get who hit us

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload())
app.use('/api', api)
app.use(express.static('static'))



// Connection with mongo
mongoose.connect('mongodb+srv://dlomba:Mydz46VWU4TZJg3I@cluster0-v4jvk.mongodb.net/dev_teacher_eval?retryWrites=true');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
    console.log("Connection Successful!");
});

//Connect to server
app.listen(process.env.PORT || 8082)
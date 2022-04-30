const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT||4500;
const cors = require('cors')
const routes = require('./Routes/Routes')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

// mongoose
const dbURI = process.env.URI;
mongoose.connect(dbURI, (err)=>{
    { !err ? console.log('DB Connected Successfully') : console.log(err) };
})

mongoose.Promise = global.Promise;

// Routes
app.use('/api', routes)

app.listen(PORT, ()=> console.log(`You are connected to port ${PORT}`))
const express = require('express');
const port = process.env.port || 5000
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();

//mongodb connection
const db = require('./db');
global.__root = __dirname + '/';

//sgmail integration
var sgMail = require('./sgmail');
global.__root = __dirname + '/';

//body parser to parse json objects
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// testing route
app.get("/", (req,res) => {
    res.send({msg:'hello word'});
});


// controllers 
const userController = require('./users/userController');

app.enable('trust proxy');

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// routes
app.use('/api/users', userController);



app.listen(port, () => {
    console.log("listening to port", port);
});
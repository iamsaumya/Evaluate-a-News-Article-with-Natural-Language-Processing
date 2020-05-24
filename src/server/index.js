require('dotenv').config();

var path = require('path');
const express = require('express');

//Importing JS
const mockAPIResponse = require('./mockAPI.js');

//Importing necessary libraries
const cors = require('cors');
var bodyParser = require('body-parser');

//Importing API SDK and setting up the textapi with secret keys.
const aylien = require("aylien_textapi");

const textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

const app = express();


app.use(express.static('dist'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

// Designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Sever running on 8081!')
});

//Homepage
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

app.post('/getAnalysis',function (req,res) {
    textapi.sentiment({
        'url': req.body.url,
    }, function(error, response) {
        if(error === null){
            res.send(response);
        }
    });
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});

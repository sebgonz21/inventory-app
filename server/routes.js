const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const apiApp = require('./api.js');

/** MIDDLEWARE */
app.use(bodyParser.json());

app.use('/api',apiApp);

app.get('',(req,res) =>{
    
    res.sendFile(path.join(__dirname + '/../client/home.html'));
});
app.get('/client/*',(req,res)=>{
    res.sendFile(path.join(__dirname + '/../'+req.url));
});


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname + req.url));
});

module.exports = app;
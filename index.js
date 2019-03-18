const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express()

const routes = require('./routes/index');

app.use('/', routes);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//Set some headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type");
    next()
  })

app.listen(3000, function(){
	console.log('My Web app listening to port: 3000!');
});

module.exports = app;
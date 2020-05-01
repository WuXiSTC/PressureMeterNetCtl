var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/Task', require("./routes/Task"));
app.use('/getTasks', require("./routes/getTasks"));
app.use('/GraphQuery', require("./routes/GraphQuery"));

module.exports = app;

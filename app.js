var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var mysql = require('mysql');

var morgan = require('morgan');

var session = require('express-session');

var configDB = require('./config/database.js');

//mysql connection

// Credentials
var mysqlConnect = mysql.createConnection({
    host: "sql9.freesqldatabase.com",
    user: "sql9229224",
    password: "6m2d4QZdzj",
    database: "sql9229224"
  });
  
// mysql connection
var query = "Select * from Articles"
mysqlConnect.query(query, function (err, result, fields) {
  if (err) throw err;
  console.log(result);
});

// pages
var index = require('./routes/index');
var article = require('./routes/article');
var customermessages = require('./routes/customermessages');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// pages
app.use('/', index);
app.use('/article', article);
app.use('/customermessages', customermessages);

// Response to ajax call to the customermessage page
app.get('/message', function(req, res) {
  
  var query = "Select * from contactus"
  mysqlConnect.query(query, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
  res.send("<p>Reply to ajax call from server, updating once every second.</p>" + Date());
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('./pages/error');
});

module.exports = app;

app.listen(3000);
console.log('Listening on port 3000');
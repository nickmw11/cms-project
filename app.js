/* Filename: app.js
 * Description: This file requires the necessary modules,
 * sets up the MySQL connection, contains routs to all main pages,
 * and has the code to recieve requests and submit form input to databases.
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var mysql = require('mysql');
var morgan = require('morgan');
var session = require('express-session');
var configDB = require('./config/database.js');
var Session = require('node-session');

var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var app = express();

//mysql connection
var configDB = require('./config/database.js');

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

// requiring routes
var index = require('./routes/indexRoute');
var article = require('./routes/articleRoute');
var customermessages = require('./routes/customermessagesRoute');
var post = require('./routes/postRoute');
var users = require('./routes/usersRoute');
var jobpostings = require('./routes/jobPostingsRoute');
var blog = require('./routes/blogRoute');
var about = require('./routes/aboutRoute');
var signup = require('./routes/signupRoute')
var login = require('./routes/loginRoute')

// using routes
app.use('/', index);
app.use('/article', article);
app.use('/customermessages', customermessages);
app.use('/post', post);
app.use('/jobpostings', jobpostings);
app.use('/blog', blog);
app.use('/about', about);
app.use('/signup', signup);
app.use('/login', login);

app.use(session({
  secret:'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD',
  resave: false,
  saveUnitialized: true,
  cookie: { secure: false }
}));
session.startSession(req, res, callback)

                    console.log(session.id);
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

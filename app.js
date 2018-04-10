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

var app = express();

// mysql connection
var configDB = require('./config/database.js');
var mysqlConnect = mysql.createConnection(configDB.url);


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

// routes
var index = require('./routes/index');
var article = require('./routes/article');
var customermessages = require('./routes/customermessages');
var post = require('./routes/post');
var users = require('./routes/users');
var jobpostings = require('./routes/jobpostings');
var blog =require('./routes/blog');

// pages
app.use('/', index);
app.use('/article', article);
app.use('/customermessages', customermessages);
app.use('/post', post);
app.use('/jobpostings', jobpostings);
app.use('/blog', blog);

// This gets the form input from the articles page in req.body
app.post('/submitArticle', function(req, res) {
	console.log(req.body.articleTitle);
	console.log(req.body.articleAuthor);
	console.log(req.body.articleContent);
	console.log(req.body.articleDate);

	title = req.body.articleTitle;
	author = req.body.articleAuthor;
	content = req.body.articleContent;
	date = req.body.articleDate;

	// Replaces single quotes with 2 single quotes so that it won't mess up the query.
	title = title.replace(/'/g,"''");
	author = author.replace(/'/g,"''");
	content = content.replace(/'/g,"''");

	// sql query
	var query = "INSERT INTO Articles (title,author,date,content) VALUES ('" + title + "','" + author + "','" + date + "','" + content + "');";
	mysqlConnect.query(query, function (err, result, fields) {
	if (err) throw err;
	else res.render("pages/confirmation");
	})
});

// This gets the form input from the job postings page in req.body
  app.post('/submitjobpostings', function(req, res) {
    console.log(req.body.jobTitle);
    console.log(req.body.jobDescription);
    console.log(req.body.jobRequirements);


    title = req.body.jobTitle;
    description = req.body.jobDescription;
    requirements = req.body.jobRequirements;

    // Replaces single quotes with 2 single quotes so that it won't mess up the query.
    title = title.replace(/'/g,"''");
    description = description.replace(/'/g,"''");
    requirements = requirements.replace(/'/g,"''");

    var query = "INSERT INTO jobpostings (title,description,requirements) VALUES ('" + title + "','" + description + "','" + requirements + "');";
    mysqlConnect.query(query, function (err, result, fields) {
      if (err) throw err;
      else res.render("pages/confirmation");
    })
});

app.post('/submitBlog', function(req, res) {
	console.log(req.body.blogTitle);
	console.log(req.body.blogAuthor);
	console.log(req.body.blogContent);
	console.log(req.body.blogDate);

	title = req.body.blogTitle;
	author = req.body.blogAuthor;
	content = req.body.blogContent;
	date = req.body.blogDate;

	// Replaces single quotes with 2 single quotes so that it won't mess up the query.
	title = title.replace(/'/g,"''");
	author = author.replace(/'/g,"''");
	content = content.replace(/'/g,"''");

	var query = "INSERT INTO Blog (title,author,date,content) VALUES ('" + title + "','" + author + "','" + date + "','" + content + "');";
	mysqlConnect.query(query, function (err, result, fields) {
	if (err) throw err;
	else res.render("pages/confirmation");
	})
});

// Sends a reply to the customer messages page with messages pulled from the database
app.get('/messages', function(req, res) {
	var query = "Select * from contactus"
	var resultString = "";

	mysqlConnect.query(query, function (err, result, fields) {
	  if (err) throw err;

	  numRows = result.length;
	  var articleArray = [];
	  for (i = numRows - 1; i >= 0; i--) {
	  resultString = resultString + "<h2>Name: " + result[i].firstname + " " + result[i].lastname + "</h2><h4>" + "Email: " + result[i].email + "</h4><h4>Phone:" + result[i].phone + "</h4><h2>" + result[i].subjectofmessage + "</h2><p>" + result[i].bodyofmessage + "</p>";
	}
	  res.send(resultString);
	});
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

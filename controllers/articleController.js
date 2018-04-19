/* Filename: articleController.js
 * Author: John Paul Depew
 * Description: This file takes input from the article.ejs page and submits it into the Article table
 * in the database.
 */

// mysql connection
var mysqlConnect = require('../config/database.js');
const fileUpload = require('express-fileupload');
var multer  = require('multer')
var upload  = multer({ dest: 'uploads/' })

exports.createArticle = function(req, res){
    console.log(req.body.articleTitle);
	console.log(req.body.articleAuthor);
	console.log(req.body.articleContent);
	console.log(req.body.articleDate);
	console.log(req.file);


	var title = req.body.articleTitle;
	var author = req.body.articleAuthor;
	var content = req.body.articleContent;
	var date = req.body.articleDate;
	var articleImage = req.file;
	var isActive = req.body.is_active == "on" ? 1 : 0;
	console.log(isActive);
	
	console.log(articleImage);

	

	// Replaces single quotes with 2 single quotes so that it won't mess up the query.
	title = title.replace(/'/g,"''");
	author = author.replace(/'/g,"''");
	content = content.replace(/'/g,"''");
	// sql query
	var query = "INSERT INTO Articles (title,author,date,content,image,is_active) VALUES ('" + title + "','" + author + "','" + date + "','" + content +  "','" + articleImage + "','" + isActive + "');";
	mysqlConnect.query(query, function (err, result, fields) {
	if (err) throw err;
	else res.render("pages/confirmation");
    })
};

exports.displayArticles = function (req, res){
	var query = "Select * from Articles"
	var resultString = "";

	mysqlConnect.query(query, function (err, result, fields) {
		if (err) throw err;

		numRows = result.length;
		var articleArray = [];
		for (i = numRows - 1; i >= 0; i--) {
			var isActive = result[i].is_active == 1 ? "Yes" : "No";
			resultString = resultString + " <div class=\"row\"><div class=\"col-lg-10 col-md-10 col-sm-8 col-xs-10\"><h3>" + result[i].Title + " " + result[i].ID + "</h3><h5>" + "Author: " + result[i].Author + "</h5><h5>Is Active:" + isActive +"</h5></div><div class=\"col-lg-2 col-md-2 col-sm-4 col-xs-2\"><form method=\"POST\" action=\"/article/deleteArticles\"> <input type=\"hidden\" class=\"form-control d-none\" id=\"articleID\" value=\"" + result[i].ID + "\" name=\"articleID\"><button  type=\"submit\" class=\"btn\">Delete</button></form> <form method=\"POST\" action=\"/article/toggleIsActive\"><input type=\"hidden\" class=\"form-control d-none\" id=\"articleID\" value=\"" + result[i].ID + "\" name=\"articleID\"><button type=\"submit\" class=\"btn\">Toggle</button></form></div></div>";
		}
		res.send(resultString);
	});
}

exports.deleteArticles = function (req, res){
	var articleID = req.body.articleID;
	var query = "DELETE FROM Articles WHERE ID = " + articleID + ";";

	mysqlConnect.query(query, function (err, result, fields) {
		if (err) throw err;
	});
	res.render('pages/article');
}

exports.toggleIsActive = function (req, res){
	var articleID = req.body.articleID;
	var query = "SELECT * FROM Articles WHERE ID = " + articleID + ";";
	var isActive;

	mysqlConnect.query(query, function (err, result, fields) {
		if (err) throw err;
		console.log(result[0].is_active);
		isActive = result[0].is_active == 1 ? 0 : 1;
		console.log(isActive);
		var updateQuery = "UPDATE Articles SET is_active = " + isActive + " WHERE ID = " + articleID + ";";
		toggleIsActiveQuery(updateQuery);
	});

	res.render('pages/article');
}

/* This function toggles the is_active field on the given article.
 * @param updateQuery - the query with instructions to update the field.
 */
function toggleIsActiveQuery(updateQuery){
	mysqlConnect.query(updateQuery, function (err, result, fields) {
		if (err) throw err;
	});
}
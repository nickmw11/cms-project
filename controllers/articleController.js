/* Filename: articleController.js
 * Author: John Paul Depew
 * Description: This file takes input from the article.ejs page and submits it into the Article table
 * in the database.
 */

// mysql connection
var mysqlConnect = require('../config/database.js');
const fileUpload = require('express-fileupload');

exports.createArticle = function(req, res){
    console.log(req.body.articleTitle);
	console.log(req.body.articleAuthor);
	console.log(req.body.articleContent);
	console.log(req.body.articleDate);
	console.log(req.body.articleImage);


	title = req.body.articleTitle;
	author = req.body.articleAuthor;
	content = req.body.articleContent;
	date = req.body.articleDate;
	articleImage = req.body.articleImage;
	

	

	// Replaces single quotes with 2 single quotes so that it won't mess up the query.
	title = title.replace(/'/g,"''");
	author = author.replace(/'/g,"''");
	content = content.replace(/'/g,"''");
	// sql query
	var query = "INSERT INTO Articles (title,author,date,content,image) VALUES ('" + title + "','" + author + "','" + date + "','" + content +  "','" + articleImage + "');";
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
		resultString = resultString + " <div class=\"row\"><div class=\"col-lg-10 col-md-10 col-sm-8 col-xs-10\"><h3>" + result[i].Title + " " + result[i].ID + "</h3><h5>" + "Author: " + result[i].Author + "</h5></div><div class=\"col-lg-2 col-md-2 col-sm-4 col-xs-2\"><input type=\"button\" onclick=\"deleteArticle(" + result[i].ID + ")\" value=\"Delete\" class=\"btn\"></input></div></div>";
	}
	res.send(resultString);
});
}
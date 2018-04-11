/* Filename: articleController.js
 * Author: John Paul Depew
 * Description: This file takes input from the article.ejs page and submits it into the Article table
 * in the database.
 */

// mysql connection
var configDB = require('../config/database.js');

exports.createArticle = function(req, res){
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
	configDB.query(query, function (err, result, fields) {
	if (err) throw err;
	else res.render("pages/confirmation");
    })
};
/* Filename: articleController.js
 * Author: John Paul Depew
 * Description: This file takes input from the article.ejs page and submits it into the Article table
 * in the database.
 */

// mysql connection
var mysqlConnect = require('../config/database.js');
const fileUpload = require('express-fileupload');
var multer  = require('multer');
var upload  = multer({ dest: 'uploads/' });

/* This function creates an article and submits it into the database.
 * It then renders the comfirmation.ejs page.
 * @param req - the request which contains the form input for the article
 * @param res - the response which renders the confirmation page.
 */
exports.createArticle = function(req, res){

	console.log(req.file);

	var title = req.body.articleTitle;
	var author = req.body.articleAuthor;
	var content = req.body.articleContent;
	var date = req.body.articleDate;
	var articleImage = req.file.originalname;
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

/* This function creates a query selecting all articles from the articles table in the database.
 * It formats them, putting them into resultString, and then sends resultString as the response.
 */
exports.displayArticles = function (req, res){
	var query = "Select * from Articles"
	var resultString = "";

	// HTML strings that are part of the resultString
	var divStartString = "<div class=\"row\"><div class=\"col-lg-10 col-md-10 col-sm-8 col-xs-8\">";
	var divFormStringStart = "<div class=\"col-lg-2 col-md-2 col-sm-4 col-xs-4\">";
	var formDeleteStartString = "<form method=\"POST\" action=\"/article/deleteArticles\">";
	var formToggleStartString = "<form method=\"POST\" action=\"/article/toggleIsActive\">";
	var deleteButton = "<div style=\"margin-top:20px\"><button type=\"submit\" class=\"btn btn-default\">Delete</button></div>";
	var toggleButton = "<div style=\"margin-top:10px\"><button type=\"submit\" class=\"btn btn-default\">Toggle</button></div>";
	var divEnd = "</div>";
	var formEnd = "</form>";

	mysqlConnect.query(query, function (err, result, fields) {
		if (err) throw err;

		numRows = result.length;
		var articleArray = [];
		for (i = numRows - 1; i >= 0; i--) {
			var isActive = result[i].is_active == 1 ? "Yes" : "No";
			resultString = resultString + divStartString + "<h3>" + result[i].Title + "</h3><h5>" + "Author: " + result[i].Author + "</h5><h5>Is Active:" + isActive +"</h5>" + divEnd + divFormStringStart + formDeleteStartString + "<input type=\"hidden\" class=\"form-control d-none\" id=\"articleID\" value=\"" + result[i].ID + "\" name=\"articleID\">" + deleteButton + formEnd + formToggleStartString + "<input type=\"hidden\" class=\"form-control d-none\" id=\"articleID\" value=\"" + result[i].ID + "\" name=\"articleID\">" + toggleButton + formEnd + divEnd + divEnd;
		}
		res.send(resultString);
	});
}

/* This function deletes articles from the database based on the id of the article
 * @param req - contains the id of the article
 */
exports.deleteArticles = function (req, res){
	var articleID = req.body.articleID;
	var query = "DELETE FROM Articles WHERE ID = " + articleID + ";";

	mysqlConnect.query(query, function (err, result, fields) {
		if (err) throw err;
	});
	res.render('pages/article');
}

/* This function toggles whether the article should be displayed on the front end website
 * based on its ID.
 */
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

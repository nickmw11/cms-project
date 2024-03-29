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
 * It then reloads the page
 * @param req - the request which contains the form input for the article
 * @param res - the response which renders articles page.
 */
exports.createArticle = function(req, res){

	var title = req.body.articleTitle;
	var author = req.body.articleAuthor;
	var content = req.body.articleContent;
	var date = req.body.articleDate;

	if (req.file) {
		console.log(req.file.originalname);
		var articleImage = req.file.originalname;
	}
	else {
		var articleImage = 'noimage.png';
	}
	var is_active = req.body.is_active == "on" ? 1 : 0;

	console.log("article image: " + articleImage);

	// Replaces single quotes with 2 single quotes so that it won't mess up the query.
	title = title.replace(/'/g,"''");
	author = author.replace(/'/g,"''");
	content = content.replace(/'/g,"''");

	// sql query
	var query = "INSERT INTO articles (title,author,date,content,image,is_active) VALUES ('" + title + "','" + author + "','" + date + "','" + content +  "','" + articleImage + "','" + is_active + "');";
	mysqlConnect.query(query, function (err, result, fields) {
	if (err) throw err;
	else res.render("pages/article");
    })
};

/* This function creates a query selecting columns id, title, author, and is_active from
 * all articles from the articles table in the database.
 * Then it renders articleDisplay passing in an array of all datafields for each
 * article.
 */
exports.displayArticles = function (req, res){
	var query = "Select id, title, author, is_active from articles"
	var articleArray = [];

	mysqlConnect.query(query, function (err, result, fields) {
		if (err) throw err;

		numRows = result.length;
		for (i = numRows - 1; i >= 0; i--) {
			var is_active = result[i].is_active == 1 ? "Yes" : "No";
			articleArray.push({ id: result[i].id, title: result[i].title, author: result[i].author, is_active: is_active });
		}
		res.render('displays/articleDisplay', {
            articleArray: articleArray
        });
	});
}

/* This function deletes articles from the database based on the id of the article
 * @param req - contains the id of the article
 */
exports.deleteArticle = function (req, res){
	var articleID = req.body.articleID;
	var query = "DELETE FROM articles WHERE id = " + articleID + ";";

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
	var query = "SELECT * FROM articles WHERE id = " + articleID + ";";
	var isActive;

	mysqlConnect.query(query, function (err, result, fields) {
		if (err) throw err;
		isActive = result[0].is_active == 1 ? 0 : 1;
		var updateQuery = "UPDATE articles SET is_active = " + isActive + " WHERE id = " + articleID + ";";
		toggleIsActiveQuery(updateQuery);
	});

	res.render('pages/article');
}

/* This displays the edit article page.
 * A article with id req.body.articleID has its column values put into the
 * input boxes in the articleEdit page.
 */
exports.editArticle = function (req, res) {

    var articleID = req.body.articleID;
    var query = "SELECT * FROM articles WHERE id = " + articleID + ";";
	var article;
	
    mysqlConnect.query(query, function (err, result, fields) {
        if (err) throw err;
		var checked = result[0].is_active == 1 ? "checked" : "";
		console.log(result[0].image);
        article = { id: result[0].id, title: result[0].title, author: result[0].author, date: result[0].date, content: result[0].content, image: result[0].image, checked: checked };
        res.render('edit/articleEdit', {
            article: article
        });
    });
}

/* This function submits the edited fields into the database, updating the article.
 */
exports.submitEdit = function (req, res) {
    var articleID = req.body.articleID;
    var title = req.body.articleTitle;
    var author = req.body.articleAuthor;
    var content = req.body.articleContent;
    var date = req.body.articleDate;
	var is_active = req.body.is_active == "on" ? 1 : 0;
	var articleImage;
	if (req.file) {
		console.log(req.file.originalname);
		articleImage = req.file.originalname;
	}
	else {
		var articleImage = 'noimage.png';
	}

    title = title.replace(/'/g,"''");
    author = author.replace(/'/g,"''");
    content = content.replace(/'/g,"''");

    var updateQuery = "UPDATE articles SET title = '" + title + "', author = '" + author + "', content = '" + content + "', date = '" + date + "', image = '" + articleImage + "', is_active = '" + is_active + "' WHERE id = '" + articleID + "';";

    mysqlConnect.query(updateQuery, function (err, result, fields) {
        if (err) throw err;
        res.render('pages/article');
    });
}

/* This function toggles the is_active field on the given article.
 * @param updateQuery - the query with instructions to update the field.
 */
function toggleIsActiveQuery(updateQuery){
	mysqlConnect.query(updateQuery, function (err, result, fields) {
		if (err) throw err;
	});
}
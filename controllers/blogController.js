/* Filename: blogController.js
 * Author: John Paul Depew
 * Description: This file takes input from the blog.ejs page and submits it into the Blog table
 * in the database.
 */

// mysql connection
var configDB = require('../config/database.js');

exports.createBlog = function(req, res){
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
    configDB.query(query, function (err, result, fields) {
    if (err) throw err;
    else res.render("pages/confirmation");
    })
};
/* Filename: blogController.js
 * Author: John Paul Depew
 * Description: This file takes input from the blog.ejs page and submits it into the Blog table
 * in the database.
 */

// mysql connection
var mysqlConnect = require('../config/database.js');

/* This function creates an blog and submits it into the database.
 * It then renders the comfirmation.ejs page.
 * @param req - the request which contains the form input for the blog
 * @param res - the response which renders the confirmation page.
 */
exports.createBlog = function(req, res){

    var title = req.body.blogTitle;
    var author = req.body.blogAuthor;
    var content = req.body.blogContent;
    var date = req.body.blogDate;

    // Replaces single quotes with 2 single quotes so that it won't mess up the query.
    title = title.replace(/'/g,"''");
    author = author.replace(/'/g,"''");
    content = content.replace(/'/g,"''");

    var query = "INSERT INTO blog (title,author,date,content) VALUES ('" + title + "','" + author + "','" + date + "','" + content + "');";
    mysqlConnect.query(query, function (err, result, fields) {
    if (err) throw err;
    else res.render("pages/confirmation");
    })
};

/* This function creates a query selecting title, author, id, and is_active from all blogs in the blog table in the database.
 * It then loops through all items, pushing them as objects onto blogArray. Finally, it renders the blogDisplay page,
 * passing blogArray as to that page.
 */
exports.displayBlog = function (req, res){
    var query = "SELECT id, title, author, is_active FROM blog"
    var blogArray = [];
  
    mysqlConnect.query(query, function (err, result, fields) {
        if (err) throw err;
  
        numRows = result.length;
        for (i = numRows - 1; i >= 0; i--) {
            var is_active = result[i].is_active == 1 ? "Yes" : "No";
            blogArray.push( { id: result[i].id, title: result[i].title, author: result[i].author, is_active: is_active } );
        }
        res.render('displays/blogDisplay', {
            blogArray: blogArray
        });
    });
  }
  /* This function deletes jobpostings from the database based on the id of the job
   * @param req - contains the id of the article
   */
  exports.deleteBlog = function (req, res){
  
      var blogID = req.body.blogID;
      var query = "DELETE FROM blog WHERE id = " + blogID + ";";
  
      mysqlConnect.query(query, function (err, result, fields) {
          if (err) throw err;
      });
      res.render('pages/blog');
  }
  
  /* This function toggles whether the job posting should be displayed on the front end website
   * based on its ID.
   */
  exports.toggleIsActive = function (req, res){
  
    var blogID = req.body.blogID;
    var query = "SELECT * FROM blog WHERE id = " + blogID + ";";
    var isActive;
  
      mysqlConnect.query(query, function (err, result, fields) {
          if (err) throw err;
          
          isActive = result[0].is_active == 1 ? 0 : 1;
          var updateQuery = "UPDATE blog SET is_active = " + isActive + " WHERE id = " + blogID + ";";
          toggleIsActiveQuery(updateQuery);
      });
  
      res.render('pages/blog');
  }
  
  /* This function toggles the is_active field on the given job posting.
   * @param updateQuery - the query with instructions to update the field.
   */
  function toggleIsActiveQuery(updateQuery){
  
      mysqlConnect.query(updateQuery, function (err, result, fields) {
          if (err) throw err;
      });
  }
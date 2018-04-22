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

/* This function creates a query selecting Title, jobID, and is_active from all jobPostings from the jobpostings table in the database.
 * It formats them, putting them into resultString, and then sends resultString as the response.
 */
exports.displayBlog = function (req, res){
    var query = "SELECT ID, Title, Author, is_active FROM blog"
    var resultString = "";
  
    // HTML strings that are part of the resultString
    var divStartString = "<div class=\"row\"><div class=\"col-lg-10 col-md-10 col-sm-8 col-xs-8\">";
    var divFormStringStart = "<div class=\"col-lg-2 col-md-2 col-sm-4 col-xs-4\">";
    var formDeleteStartString = "<form method=\"POST\" action=\"/blog/deleteBlog\">";
    var formToggleStartString = "<form method=\"POST\" action=\"/blog/toggleIsActive\">";
    var inputStart = "<input type=\"hidden\" class=\"form-control d-none\" id=\"blogID\" name=\"blogID\" value=\""
    var inputEnd = "\" />"
    var deleteButton = "<div style=\"margin-top:20px\"><button type=\"submit\" class=\"btn btn-default\">Delete</button></div>";
    var toggleButton = "<div style=\"margin-top:10px\"><button type=\"submit\" class=\"btn btn-default\">Toggle</button></div>";
    var divEnd = "</div>";
    var formEnd = "</form>";
  
    mysqlConnect.query(query, function (err, result, fields) {
        if (err) throw err;
  
        numRows = result.length;
        for (i = numRows - 1; i >= 0; i--) {
          var isActive = result[i].is_active == 1 ? "Yes" : "No";
          resultString = resultString + divStartString + "<h2>Title: " + result[i].Title + "</h2><h2>Author: " + result[i].Author + "</h2><h3>" + isActive + "</h3>" + divEnd + divFormStringStart + formDeleteStartString + inputStart + result[i].ID + inputEnd + deleteButton + formEnd + formToggleStartString + inputStart + result[i].ID + inputEnd + toggleButton + formEnd + divEnd + divEnd;
        }
        res.send(resultString);
    });
  }
  
  /* This function deletes jobpostings from the database based on the id of the job
   * @param req - contains the id of the article
   */
  exports.deleteBlog = function (req, res){
  
      var blogID = req.body.blogID;
      var query = "DELETE FROM blog WHERE ID = " + blogID + ";";
  
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
    var query = "SELECT * FROM blog WHERE ID = " + blogID + ";";
    var isActive;
  
      mysqlConnect.query(query, function (err, result, fields) {
          if (err) throw err;
          
          isActive = result[0].is_active == 1 ? 0 : 1;
          var updateQuery = "UPDATE blog SET is_active = " + isActive + " WHERE ID = " + blogID + ";";
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
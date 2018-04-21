/* Filename: jobPostingsController.js
 * Authors: Mitchell Plute and John Paul Depew
 * Description: This file takes input from the jobpostings.ejs page and submits it into the jobpostings table
 * in the database.
 * It also displays the title of a job posting, toggles whether a job is displayed on the front-end site, and deletes jobs.
 */

// mysql connection
var mysqlConnect = require('../config/database.js');

/* This function creates an job posting and submits it into the database.
 * It then renders the comfirmation.ejs page.
 * @param req - the request which contains the form input for the job
 * @param res - the response which renders the confirmation page.
 */
exports.createjobposting = function(req, res){
  // This gets the form input from the job postings page in req.body

      title = req.body.jobTitle;
      description = req.body.jobDescription;
      requirements = req.body.jobRequirements;
      var isActive = req.body.is_active == "on" ? 1 : 0;

      // Replaces single quotes with 2 single quotes so that it won't mess up the query.
      title = title.replace(/'/g,"''");
      description = description.replace(/'/g,"''");
      requirements = requirements.replace(/'/g,"''");

      var query = "INSERT INTO jobpostings (title,description,requirements,is_active) VALUES ('" + title + "','" + description + "','" + requirements + "','" + isActive + "');";
      mysqlConnect.query(query, function (err, result, fields) {
        if (err) throw err;
        else res.render("pages/confirmation");
      })
  };

/* This function creates a query selecting Title, jobID, and is_active from all jobPostings from the jobpostings table in the database.
 * It formats them, putting them into resultString, and then sends resultString as the response.
 */
exports.displayJobPostings = function (req, res){
  var query = "Select Title, jobID, is_active from jobpostings"
  var resultString = "";

  // HTML strings that are part of the resultString
  var divStartString = "<div class=\"row\"><div class=\"col-lg-10 col-md-10 col-sm-8 col-xs-8\">";
  var divFormStringStart = "<div class=\"col-lg-2 col-md-2 col-sm-4 col-xs-4\">";
  var formDeleteStartString = "<form method=\"POST\" action=\"/jobpostings/deleteJobPostings\">";
  var formToggleStartString = "<form method=\"POST\" action=\"/jobpostings/toggleIsActive\">";
  var inputStart = "<input type=\"hidden\" class=\"form-control d-none\" id=\"jobID\" name=\"jobID\" value=\""
  var inputEnd = "\" />"
  var deleteButton = "<div style=\"margin-top:20px\"><button type=\"submit\" class=\"btn btn-default\">Delete</button></div>";
  var toggleButton = "<div style=\"margin-top:10px\"><button type=\"submit\" class=\"btn btn-default\">Toggle</button></div>";
  var divEnd = "</div>";
  var formEnd = "</form>";

  mysqlConnect.query(query, function (err, result, fields) {
      if (err) throw err;

      numRows = result.length;
      var jobpostingsArray = [];
      for (i = numRows - 1; i >= 0; i--) {
        var isActive = result[i].is_active == 1 ? "Yes" : "No";
        resultString = resultString + divStartString + "<h2>Job Title: " + result[i].Title + "</h2><h3>" + isActive + "</h3>" + divEnd + divFormStringStart + formDeleteStartString + inputStart + result[i].jobID + inputEnd + deleteButton + formEnd + formToggleStartString + inputStart + result[i].jobID + inputEnd + toggleButton + formEnd + divEnd + divEnd;
      }
      res.send(resultString);
  });
}

/* This function deletes jobpostings from the database based on the id of the job
 * @param req - contains the id of the article
 */
exports.deleteArticles = function (req, res){

	var jobID = req.body.jobID;
	var query = "DELETE FROM jobpostings WHERE jobID = " + jobID + ";";

	mysqlConnect.query(query, function (err, result, fields) {
		if (err) throw err;
	});
	res.render('pages/jobpostings');
}

/* This function toggles whether the job posting should be displayed on the front end website
 * based on its ID.
 */
exports.toggleIsActive = function (req, res){

  var jobID = req.body.jobID;
	var query = "SELECT * FROM jobpostings WHERE jobID = " + jobID + ";";
  var isActive;

	mysqlConnect.query(query, function (err, result, fields) {
		if (err) throw err;
		console.log(result[0].is_active);
		isActive = result[0].is_active == 1 ? 0 : 1;
		console.log(isActive);
		var updateQuery = "UPDATE jobpostings SET is_active = " + isActive + " WHERE jobID = " + jobID + ";";
		toggleIsActiveQuery(updateQuery);
	});

	res.render('pages/jobpostings');
}

/* This function toggles the is_active field on the given job posting.
 * @param updateQuery - the query with instructions to update the field.
 */
function toggleIsActiveQuery(updateQuery){

	mysqlConnect.query(updateQuery, function (err, result, fields) {
		if (err) throw err;
	});
}
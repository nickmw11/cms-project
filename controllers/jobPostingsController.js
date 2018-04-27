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
      var is_active = req.body.is_active == "on" ? 1 : 0;

      // Replaces single quotes with 2 single quotes so that it won't mess up the query.
      title = title.replace(/'/g,"''");
      description = description.replace(/'/g,"''");
      requirements = requirements.replace(/'/g,"''");

      var query = "INSERT INTO jobpostings (title, description, requirements, is_active) VALUES ('" + title + "','" + description + "','" + requirements + "','" + is_active + "');";
      mysqlConnect.query(query, function (err, result, fields) {
        if (err) throw err;
        else res.render("pages/jobpostings");
      })
  };

/* This function creates a query selecting title, id, and is_active from all jobPostings from the jobpostings table in the database.
 * It puts all of them into jobArray, then renders jobDisplay, passing in jobArray. 
 */
exports.displayJobPostings = function (req, res){
  var query = "SELECT id, title, is_active FROM jobpostings"
  var jobArray = [];

  mysqlConnect.query(query, function (err, result, fields) {
      if (err) throw err;

      numRows = result.length;
      var jobpostingsArray = [];
      for (i = numRows - 1; i >= 0; i--) {
        var is_active = result[i].is_active == 1 ? "Yes" : "No";
        jobArray.push({ id: result[i].id, title: result[i].title, is_active: is_active });
      }
      // Rendering the preview panel ejs page and passing in jobArray
      res.render('displays/jobDisplay', {
        jobArray: jobArray
      })
  });
}

/* This function deletes jobpostings from the database based on the id of the job
 * @param req - contains the id of the article
 */
exports.deleteJobPostings = function (req, res){

	var jobID = req.body.jobID;
	var query = "DELETE FROM jobpostings WHERE id = " + jobID + ";";

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
	var query = "SELECT * FROM jobpostings WHERE id = " + jobID + ";";
  var is_active;

	mysqlConnect.query(query, function (err, result, fields) {
    if (err) throw err;
    
		is_active = result[0].is_active == 1 ? 0 : 1;
		var updateQuery = "UPDATE jobpostings SET is_active = " + is_active + " WHERE id = " + jobID + ";";
		toggleIsActiveQuery(updateQuery);
	});

	res.render('pages/jobpostings');
}

/* This displays the edit jobpostings page.
 * A job with id req.body.jobID has its column values put into the
 * input boxes in the job page.
 */
exports.editJob = function (req, res) {

  var jobID = req.body.jobID;
  var query = "SELECT * FROM jobpostings WHERE id = " + jobID + ";";
  var job;

  mysqlConnect.query(query, function (err, result, fields) {
      if (err) throw err;
      var checked = result[0].is_active == 1 ? "checked" : "";
      job = { id: result[0].id, title: result[0].title, description: result[0].description, requirements: result[0].requirements, checked: checked };
      res.render('edit/jobEdit', {
        job: job
      });
  });
}

/* This function submits the edited fields into the database, updating the job.
*/
exports.submitEdit = function (req, res) {
  var jobID = req.body.jobID;
  var title = req.body.jobTitle;
  var description = req.body.jobDescription;
  var requirements = req.body.jobRequirements;
  var is_active = req.body.is_active == "on" ? 1 : 0;

  title = title.replace(/'/g,"''");
  description = description.replace(/'/g,"''");
  requirements = requirements.replace(/'/g,"''");

  var updateQuery = "UPDATE jobpostings SET title = '" + title + "', description = '" + description + "', requirements = '" + requirements + "',  is_active = '" + is_active + "' WHERE id = " + jobID + ";";
  mysqlConnect.query(updateQuery, function (err, result, fields) {
      if (err) throw err;
      res.render('pages/jobpostings');
  });
}

/* This function toggles the is_active field on the given job posting.
 * @param updateQuery - the query with instructions to update the field.
 */
function toggleIsActiveQuery(updateQuery){

	mysqlConnect.query(updateQuery, function (err, result, fields) {
		if (err) throw err;
	});
}
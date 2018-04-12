/* Filename: jobPostingsController.js
 * Author: Mitchell Plute
 * Description: This file takes input from the jobpostings.ejs page and submits it into the jobpostings table
 * in the database.
 */

// mysql connection
var configDB = require('../config/database.js');

exports.createjobposting = function(req, res){
  // This gets the form input from the job postings page in req.body
      console.log(req.body.jobTitle);
      console.log(req.body.jobDescription);
      console.log(req.body.jobRequirements);

      title = req.body.jobTitle;
      description = req.body.jobDescription;
      requirements = req.body.jobRequirements;

      // Replaces single quotes with 2 single quotes so that it won't mess up the query.
      title = title.replace(/'/g,"''");
      description = description.replace(/'/g,"''");
      requirements = requirements.replace(/'/g,"''");

      var query = "INSERT INTO jobpostings (title,description,requirements) VALUES ('" + title + "','" + description + "','" + requirements + "');";
      configDB.query(query, function (err, result, fields) {
        if (err) throw err;
        else res.render("pages/confirmation");
      })
  };

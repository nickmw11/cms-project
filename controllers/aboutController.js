/* Filename: aboutController.js
 * Description: This file takes input from the about.ejs page and submits it into the About table
 * in the database.
 */

// mysql connection
var mysqlConnect = require('../config/database.js');
const fileUpload = require('express-fileupload');
var multer  = require('multer');
var upload  = multer({ dest: 'uploads/' });

/* This function creates an employee and submits it into the database.
 * It then reloads the page
 * @param req - the request which contains the form input for the employee.
 * @param res - the response which renders the about page.
 */
exports.createAbout = function(req, res) {

    if (req.file) {
		console.log(req.file.originalname);
		var staffImage = req.file.originalname;
	}
	else {
		var staffImage = 'noimage.png';
	}
    var name = req.body.staffName;
    var bio = req.body.staffBio;
    console.log("staff image: " + staffImage);

    var is_active = req.body.is_active == "on" ? 1 : 0;

    // Replaces single quotes with 2 single quotes so that it won't mess up the query.
    //image = image.replace(/'/g,"''");
    name = name.replace(/'/g,"''");
    bio = bio.replace(/'/g,"''");

    var query = "INSERT INTO about (image, name, bio, is_active) VALUES ('" + staffImage + "','" + name + "','" + bio + "','" + is_active + "');";
    mysqlConnect.query(query, function (err, result, fields) {
        if (err) throw err;
        else res.render("pages/about");
    });
};

/* This function creates a query selecting columns id, name, and is_active from
 * all employees in the about table in the database.
 * Then it renders aboutDisplay passing in an array of all datafields for each
 * article.
 */
exports.displayAbout = function (req, res){
	var query = "Select id, name, is_active from about"
	var aboutArray = [];

	mysqlConnect.query(query, function (err, result, fields) {
		if (err) throw err;

		numRows = result.length;
		for (i = numRows - 1; i >= 0; i--) {
			var is_active = result[i].is_active == 1 ? "Yes" : "No";
			aboutArray.push({ id: result[i].id, name: result[i].name, is_active: is_active });
		}
		res.render('displays/aboutDisplay', {
            aboutArray: aboutArray
        });
	});
}

/* This function deletes employees from the database based on the id of the employee
 * @param req - contains the id of the employee
 */
exports.deleteAbout = function (req, res){
	var aboutID = req.body.aboutID;
	var query = "DELETE FROM about WHERE id = " + aboutID + ";";

	mysqlConnect.query(query, function (err, result, fields) {
		if (err) throw err;
	});
	res.render('pages/about');
}

/* This function toggles whether the article should be displayed on the front end website
 * based on its ID.
 */
exports.toggleIsActive = function (req, res){
	var aboutID = req.body.aboutID;
	var query = "SELECT * FROM about WHERE id = " + aboutID + ";";
	var is_active;

	mysqlConnect.query(query, function (err, result, fields) {
		if (err) throw err;
        is_active = result[0].is_active == 1 ? 0 : 1;
		var updateQuery = "UPDATE about SET is_active = " + is_active + " WHERE id = " + aboutID + ";";
		toggleIsActiveQuery(updateQuery);
	});

	res.render('pages/about');
}

/* This displays the edit about page.
 * An employee with id req.body.aboutID has its column values put into the
 * input boxes in the about page.
 */
exports.editAbout = function (req, res) {

  var aboutID = req.body.aboutID;
  var query = "SELECT * FROM about WHERE id = " + aboutID + ";";
  var about;

  mysqlConnect.query(query, function (err, result, fields) {
      if (err) throw err;
      var checked = result[0].is_active == 1 ? "checked" : "";
      about = { id: result[0].id, name: result[0].name, bio: result[0].bio, checked: checked };
      res.render('edit/aboutEdit', {
        about: about
      });
  });
}

/* This function submits the edited fields into the database, updating the employee.
*/
exports.submitEdit = function (req, res) {
  var aboutID = req.body.aboutID;
  var name = req.body.aboutName;
  var bio = req.body.aboutBio;
  var is_active = req.body.is_active == "on" ? 1 : 0;

  name = name.replace(/'/g,"''");
  bio = bio.replace(/'/g,"''");

  var updateQuery = "UPDATE about SET name = '" + name + "', bio = '" + bio + "',  is_active = '" + is_active + "' WHERE id = " + aboutID + ";";
  mysqlConnect.query(updateQuery, function (err, result, fields) {
      if (err) throw err;
      res.render('pages/about');
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
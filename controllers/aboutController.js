/* Filename: aboutController.js
 * Description: This file takes input from the about.ejs page and submits it into the About table
 * in the database.
 */

// mysql connection
var mysqlConnect = require('../config/database.js');

/* This function creates an employee and submits it into the database.
 * It then reloads the page
 * @param req - the request which contains the form input for the employee.
 * @param res - the response which renders the about page.
 */
exports.createAbout = function(req, res) {

    var image = req.body.staffImage;
    var name = req.body.staffName;
    var bio = req.body.staffBio;
    var is_active = req.body.is_active == "on" ? 1 : 0;

    // Replaces single quotes with 2 single quotes so that it won't mess up the query.
    image = image.replace(/'/g,"''");
    name = name.replace(/'/g,"''");
    bio = bio.replace(/'/g,"''");

    var query = "INSERT INTO about (image, name, bio, is_active) VALUES ('" + image + "','" + name + "','" + bio + "','" + is_active + "');";
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

/* This function toggles the is_active field on the given article.
 * @param updateQuery - the query with instructions to update the field.
 */
function toggleIsActiveQuery(updateQuery){
	mysqlConnect.query(updateQuery, function (err, result, fields) {
		if (err) throw err;
	});
}
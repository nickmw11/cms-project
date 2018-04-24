/* Filename: articleController.js
 * Author: Mitchell Plute
 * Description: This file takes input from the signup.ejs page and submits it into the Login table
 * in the database.
 */

// mysql connection
var mysqlConnect = require('../config/database.js');


/* This function creates an account and submits it into the database.
 * It then renders the comfirmation.ejs page.
 * @param res - the response which renders the confirmation page.
 */
exports.createsignup = function(req, res){

	var username = req.body.signupUsername;
	var password = req.body.signupPassword;



	// Replaces single quotes with 2 single quotes so that it won't mess up the query.
	username = username.replace(/'/g,"''");
	password = password.replace(/'/g,"''");

	// sql query
	var query = "INSERT INTO Login (Username, Password) VALUES ('" + username + "','" + password + "');";
	mysqlConnect.query(query, function (err, result, fields) {
	if (err) throw err;
	else res.render("pages/confirmation");
    })
};

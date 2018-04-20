/* Filename: messagesController.js
 * Author: John Paul Depew
 * Description: This file pulls data from the contactus table and
 * displays it on the customermessages.ejs page.
 */

// mysql connection
var configDB = require('../config/database.js');

exports.displayMessages = function(req, res){
  var query = "Select * from contactus"
	var resultString = "";
	var divStartString = "<div class=\"bg-dark\">";

	configDB.query(query, function (err, result, fields) {
	  if (err) throw err;

	  numRows = result.length;
	  var articleArray = [];
	  for (i = numRows - 1; i >= 0; i--) {
	  	resultString = resultString + divStartString + "<h2>Name: " + result[i].firstname + " " + result[i].lastname + "</h2><h4>" + "Email: " + result[i].email + "</h4><h4>Phone:" + result[i].phone + "</h4><h2>" + result[i].subjectofmessage + "</h2><p>" + result[i].bodyofmessage + "</p></div>";
	}
	  res.send(resultString);
  });
}
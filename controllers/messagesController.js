/* Filename: messagesController.js
 * Author: John Paul Depew
 * Description: This file pulls data from the contactus table and
 * displays it on the customermessages.ejs page.
 */

// mysql connection
var mysqlConnect = require('../config/database.js');

exports.displayMessages = function(req, res){
  var query = "SELECT * from contactus"
	var messageArray = [];

	mysqlConnect.query(query, function (err, result, fields) {
	  if (err) throw err;

	  numRows = result.length;
	  for (i = numRows - 1; i >= 0; i--) {
			messageArray.push({ firstname: result[i].firstname, lastname: result[i].lastname, email: result[i].email, phone: result[i].phone, subject: result[i].subjectofmessage, body: result[i].bodyofmessage })
		}
		res.render('displays/messagesDisplay', {
			messageArray: messageArray
		});
  });
}
/* Filename: loginController.js
 * Author: Mitchell Plute
 * Description: This file takes input from the login.ejs page and stores it into the session
*/

// mysql connection
var mysqlConnect = require('../config/database.js');


exports.createlogin = function(req, res){
  // This gets the form input from the job postings page in req.body
      console.log(req.body.loginUsername);
      console.log(req.body.loginPaswword);


      username = req.body.loginUsername;
      password = req.body.loginPassword;

      var query = "Select * from Login"

      mysqlConnect.query(query, function (err, result, fields) {
                  if (err) throw err;


                  numRows = result.length;
                  var articleArray = [];
                  for (i = numRows - 1; i >= 0; i--) {
                  if(result[i].Username == username && result[i].Password == password)
                  {

                    req.session.put('username', 'password');

                    res.render("pages/index");
                  }
                  else{
                    res.render("pages/error");
                  }
              }
      });
}

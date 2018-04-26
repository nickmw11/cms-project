/* Filename: aboutController.js
 * Description: This file takes input from the about.ejs page and submits it into the About table
 * in the database.
 */

// mysql connection
var configDB = require('../config/database.js');

exports.createAbout = function(req, res){
    console.log(req.body.aboutStaffImage);
    console.log(req.body.aboutStaffName);
    console.log(req.body.aboutStaffBio);

    image = req.body.aboutStaffImage;
    name = req.body.aboutStaffName;
    bio = req.body.aboutStaffBio;

    // Replaces single quotes with 2 single quotes so that it won't mess up the query.
    image = image.replace(/'/g,"''");
    name = name.replace(/'/g,"''");
    bio = bio.replace(/'/g,"''");

    var query = "INSERT INTO about (image, name, bio) VALUES ('" + image + "','" + name + "','" + bio + "');";
    configDB.query(query, function (err, result, fields) {
    if (err) throw err;
    else res.render("pages/about");
    })
};
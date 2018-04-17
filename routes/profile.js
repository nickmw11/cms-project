var express = require('express');
var router = express.Router();

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

//profile section page
router.get('/profile', isLoggedIn, function(req, res) {
       res.render('profile.ejs', {
           user : req.user // get the user out of session and pass to template
       });
   });

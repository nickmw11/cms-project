var express = require('express');
var router = express.Router();

//logout page
    router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

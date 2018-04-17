var express = require('express');
var router = express.Router();

var blogController = require('../controllers/aboutController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/about', { title: 'Express' });
});

// router.post('/submitBlog', blogController.createBlog);
// Above line should be different?

module.exports = router;
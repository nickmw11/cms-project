var express = require('express');
var router = express.Router();

var blogController = require('../controllers/blogController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/blog', { title: 'Express' });
});

router.post('/submitBlog', blogController.createBlog);

module.exports = router;
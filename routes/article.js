var express = require('express');
var router = express.Router();

var articleController = require('../controllers/articleController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/article', { title: 'Express' });
});

router.post('/', function(req, res, next) {

  res.render('pages/article', { title: 'Express' });

});

// Create article
router.post('/submitArticle', articleController.createArticle);

module.exports = router;

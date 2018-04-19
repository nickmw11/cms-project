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

// display articles
router.get('/displayArticles', articleController.displayArticles);

// delete article
router.post('/deleteArticles', function(req, res){console.log('body: ' + req.body.articleID);});

module.exports = router;

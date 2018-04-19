var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var articleController = require('../controllers/articleController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/article', { title: 'Express' });
});

router.post('/', function(req, res, next) {

  res.render('pages/article', { title: 'Express' });

});

// Create article
router.post('/submitArticle', upload.single('articleImage'), articleController.createArticle, function (req, res, next) {
  //console.log(req.file);
})


// display articles
router.get('/displayArticles', articleController.displayArticles);

// delete article
router.post('/deleteArticles', articleController.deleteArticles);

// toggle is_active on an article
router.post('/toggleIsActive', articleController.toggleIsActive);

module.exports = router;

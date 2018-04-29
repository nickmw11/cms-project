/* Filename: articleRoute.js
 * Description: This file is called with the route /article and has several subroutes
 * /submitArticle: submits a blog to the database
 * /displayArticle: displays all blogs from the database in a preview panel on the blog page
 * /deleteArticle: deletes a blog from the database
 * /toggleIsActive: toggles whether or not a blog is displayed on the fron end.
 * /editArticle: redirects the user to a page to edit an article.
 * /submitArticle: submits edited article to database.
 */

var express = require('express');
var router = express.Router();
var multer  = require('multer')
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const upload = multer({ storage: storage })

var articleController = require('../controllers/articleController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/article', { title: 'Express' });
});

router.post('/', function(req, res, next) {

  res.render('pages/article', { title: 'Express' });

});

// Create article
router.post('/submitArticle', upload.single('articleImage'), articleController.createArticle)

// display articles
router.get('/displayArticles', articleController.displayArticles);

// delete article
router.post('/deleteArticle', articleController.deleteArticle);

// toggle is_active on an article
router.post('/toggleIsActive', articleController.toggleIsActive);

// edit an article
router.post('/editArticle', articleController.editArticle);

// submit edit to a article
router.post('/submitEdit', articleController.submitEdit);

module.exports = router;

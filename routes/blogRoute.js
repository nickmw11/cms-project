/* Filename: blogRoute.js
 * Description: This file is called with the route /blog and has several subroutes
 * /submitBlog: submits a blog to the database
 * /displayBlog: displays all blogs from the database in a preview panel on the blog page
 * /deleteBlog: deletes a blog from the database
 * /toggleIsActive: toggles whether or not a blog is displayed on the fron end.
 */

var express = require('express');
var router = express.Router();

var blogController = require('../controllers/blogController');

/* GET blog page. */
router.get('/', function(req, res, next) {
  res.render('pages/blog', { title: 'Express' });
});

// submit a blog to the database
router.post('/submitBlog', blogController.createBlog);

// display blog
router.get('/displayBlogs', blogController.displayBlog);

// delete blog
router.post('/deleteBlog', blogController.deleteBlog);

// toggle is_active on a blog
router.post('/toggleIsActive', blogController.toggleIsActive);

// edit a blog
router.post('/editBlog', blogController.editBlog);

// submit edit to a blog
router.post('/submitEdit', blogController.submitEdit);

// submit edit to a blog
router.post('/cancelEdit', blogController.cancelEdit);

module.exports = router;
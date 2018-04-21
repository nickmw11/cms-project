/* Filename: customermessages.js
 * Description: This file is called by the server with the /customermessages route
 * On getting '/' it renders the customermessages page,
 * on '/displayMessages' it calls the function to display all the blog posts.
 */

var express = require('express');
var router = express.Router();

var messagesController = require('../controllers/messagesController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/customermessages', { title: 'Express' });
});

router.get('/displayMessages', messagesController.displayMessages)

module.exports = router;

var express = require('express');
var router = express.Router();

var loginController = require('../controllers/loginController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/login', { title: 'Express' });
});

router.post('/submitlogin', loginController.createlogin);

module.exports = router;

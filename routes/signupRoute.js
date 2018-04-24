var express = require('express');
var router = express.Router();

var signupController = require('../controllers/signupController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/signup', { title: 'Express' });
});

router.post('/submitsignup', signupController.createsignup);

module.exports = router;

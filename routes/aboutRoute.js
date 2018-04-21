var express = require('express');
var router = express.Router();

var aboutController = require('../controllers/aboutController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/about', { title: 'Express' });
});

router.post('/submitAbout', aboutController.createAbout);

module.exports = router;
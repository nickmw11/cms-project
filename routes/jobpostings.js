var express = require('express');
var router = express.Router();

var jobPostingsController = require('../controllers/jobPostingsController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/jobpostings', { title: 'Express' });
});

router.post('/', function(req, res, next) {

  res.render('pages/jobpostings', { title: 'Express' });

});

router.post('/submitjobposting', jobPostingsController.createjobposting);

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/jobpostings', { title: 'Express' });
});

router.post('/', function(req, res, next) {

  res.render('pages/jobpostings', { title: 'Express' });

});

module.exports = router;

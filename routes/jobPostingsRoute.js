var express = require('express');
var router = express.Router();

var jobPostingsController = require('../controllers/jobPostingsController');

/* GET job posting page. */
router.get('/', function(req, res, next) {
  res.render('pages/jobpostings', { title: 'Express' });
});

router.post('/', function(req, res, next) {

  res.render('pages/jobpostings', { title: 'Express' });

});

// submit a job posting
router.post('/submitjobposting', jobPostingsController.createjobposting);

// display job posting
router.get('/displayJobPostings', jobPostingsController.displayJobPostings);

// delete job posting
router.post('/deleteJobPostings', jobPostingsController.deleteArticles);

// toggle is_active on an job posting
router.post('/toggleIsActive', jobPostingsController.toggleIsActive);

module.exports = router;

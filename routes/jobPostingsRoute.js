/* Filename: jobPostingsRoute.js
 * Description: This file is called with the route /jobpostings and has several subroutes
 * /submitjobposting: submits a job to the database
 * /displayJobPostings: displays all jobs from the database in a preview panel on the job page
 * /deleteJobPostings: deletes a job from the database
 * /toggleIsActive: toggles whether or not a job is displayed on the front end site.
 */

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
router.post('/deleteJobPostings', jobPostingsController.deleteJobPostings);

// toggle is_active on an job posting
router.post('/toggleIsActive', jobPostingsController.toggleIsActive);

module.exports = router;

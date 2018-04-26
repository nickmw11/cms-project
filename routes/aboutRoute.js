var express = require('express');
var router = express.Router();

var aboutController = require('../controllers/aboutController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/about', { title: 'Express' });
});

router.post('/submitAbout', aboutController.createAbout);

// display employees
router.get('/displayAbout', aboutController.displayAbout);

// delete employee
router.post('/deleteAbout', aboutController.deleteAbout);

// toggle is_active on an employee
router.post('/toggleIsActive', aboutController.toggleIsActive);

module.exports = router;
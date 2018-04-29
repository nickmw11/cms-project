/* Filename: aboutRoute.js
 * Description: This file is called with the route /about and has several subroutes
 * /submitAbout: submits an employee to the database
 * /displayAbout: displays all employees from the database in a preview panel on the about page
 * /deleteAbout: deletes an employee from the database
 * /toggleIsActive: toggles whether or not an employee is displayed on the front end site.
 */

var express = require('express');
var router = express.Router();
var multer  = require('multer')
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
const upload = multer({ storage: storage })

var aboutController = require('../controllers/aboutController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/about', { title: 'Express' });
});

router.post('/submitAbout', upload.single('staffImage'), aboutController.createAbout);

// display employees
router.get('/displayAbout', aboutController.displayAbout);

// delete employee
router.post('/deleteAbout', aboutController.deleteAbout);

// toggle is_active on an employee
router.post('/toggleIsActive', aboutController.toggleIsActive);

// edit an employee
router.post('/editAbout', aboutController.editAbout);

// submit edit to an employee
router.post('/submitEdit', aboutController.submitEdit);

module.exports = router;
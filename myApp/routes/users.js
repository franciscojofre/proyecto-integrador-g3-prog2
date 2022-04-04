var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.render('login');
});

router.get('/', function (req, res) {
  res.render('profile')
})

module.exports = router;

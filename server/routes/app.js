
var express = require('../../node_modules/express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'finalProject' });
  res.sendFile(path.join(__dirname, 'dist/finalProject/index.html'));
});

module.exports = router;



var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('add_song');
});

router.get('/player', function(req, res){
	res.render('player');
});

module.exports = router;

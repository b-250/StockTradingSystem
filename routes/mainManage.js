var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var username = req.session.user.username;
	res.render('mainManage', { username:username});
});

module.exports = router;

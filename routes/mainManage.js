var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var username = req.session.admin.username;
	var type = req.session.admin.type;
	res.render('mainManage', { username:username,type:type});
});

module.exports = router;

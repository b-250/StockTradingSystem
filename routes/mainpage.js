var express = require('express');
var router = express.Router();
var User = require("../models/user.js");

/* GET home page. */
router.get('/', function(req, res) {
	var login = new User({
		username : 'Sakura'
	});
	login.userInfo(function(err,result){
		console.log(result);
		res.render('mainpage', {data: result});
	});
  
});

module.exports = router;

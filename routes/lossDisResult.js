var express = require('express');
var router = express.Router();
var User = require("../models/loss.js");



router.get('/', function(req, res) {

	var username = req.query.username;

	var user=new User({});
	user.userRefuse(username, function(err,result){
	  if(err){
		res.render('lossDisResult', {username:username, errMsg:""});
	  }else{
		res.render('lossDisResult', {data:result });
	  }
	});


});

module.exports = router;

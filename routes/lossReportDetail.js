var express = require('express');
var router = express.Router();
var User = require("../models/loss.js");

router.get('/', function(req, res) {

	var username = req.query.username;

	console.log("js-username:"+username);

	var user=new User({});
	user.userInfo(username, function(err,result){
	  if(err){
		res.render('lossReportDetail', {username:username, errMsg:"", data:""});
	  }else{
		res.render('lossReportDetail', {username:username, errMsg:"", data:result[0], title: 'Express' });
	  }
	});

});

module.exports = router;

var express = require('express');
var router = express.Router();
var User = require("../models/loss.js");

router.get('/', function(req, res) {
	var username = req.session.user.username;
	var user = new User({});	
	user.userList(function(err,result){
	  if(err){
		res.render('lossReportManage', {username:username, data:"", errMsg:""});
	  }else{
		res.render('lossReportManage', {username:username, data:result, errMsg:""});
	  }
	});

});

module.exports = router;

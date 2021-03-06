var express = require('express');
var router = express.Router();
var User = require("../models/loss.js");

router.get('/', function(req, res) {
	var admin = req.session.admin;
	var username = req.query.username;
	var type = admin.type;
	console.log("js-username:"+username);

	var user=new User({});
	user.userInfo(username, function(err,result){
	  if(err){
		res.render('lossReportDetail', {username:admin.username, errMsg:"", data:"",type:type});
	  }else{
		res.render('lossReportDetail', {username:admin.username, errMsg:"", data:result[0], title: 'Express',type:type});
	  }
	});

});

module.exports = router;

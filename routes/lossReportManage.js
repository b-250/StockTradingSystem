var express = require('express');
var router = express.Router();
var User = require("../models/loss.js");

router.get('/', function(req, res) {
	console.log("step0");
	var user = new User({});	
	user.userList(function(err,result){
	  if(err){
		res.render('lossReportManage', {errMsg:""});
	  }else{
		res.render('lossReportManage', {data:result });
	  }
	});

});

module.exports = router;

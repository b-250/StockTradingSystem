var express = require('express');
var router = express.Router();
var User = require("../models/loss.js");



router.get('/', function(req, res) {

	var username = req.query.username;
	var type = req.session.admin.type;
	var user=new User({});
	user.userRefuse(username, function(err,result){
	  if(err){
		res.render('lossDisResult', {username:username, data:"", errMsg:"",type:type});
	  }else{
		res.render('lossDisResult', {username:username, data:result, errMsg:"",type:type});
	  }
	});


});

module.exports = router;

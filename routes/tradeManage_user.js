var express = require('express');
var router = express.Router();
var Record = require("../models/record.js");

router.get('/', function(req, res, next) {
	var username = req.session.admin.username;
	res.render('tradeManage_user', {username:username, errMsg:'',data:''});		
});

router.post('/', function(req, res) {
	var user = req.session.admin;	
	//console.log("I'm here.");
	//console.log(user.type);
	if(user.type == "low")
		res.render('tradeManage_user', {errMsg:'权限不足，无法查看',data:''});	
	else
	{
		var username = req.body.username;	
		//console.log(username + ' in function');
		var trans = new Record({
				username : username
			});
		trans.TransListByAccount(trans.username, function(err,result){
			//console.log("data");
			if(err){
				res.render('tradeManage_user', {errMsg:""});
				return;
			}
			else{
				//console.log("data");
				res.render('tradeManage_user', {errMsg:"",data:result});
				return;
			}
		});
	}
});

module.exports = router;

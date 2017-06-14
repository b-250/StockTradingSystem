var express = require('express');
var router = express.Router();
var Record = require("../models/record.js");

router.get('/', function(req, res, next) {
	var username = req.session.admin.username;
	var type = req.session.admin.type;
	res.render('tradeManage_user', {username:username, errMsg:'',data:'',type:type});		
});

router.post('/', function(req, res) {
	var user = req.session.admin;	
	var type = req.session.admin.type;	
	//console.log("I'm here.");
	//console.log(user.type);
	if(user.type == "low")
		res.render('tradeManage_user', {username:req.session.admin.username,errMsg:'权限不足，无法查看',data:'',type:type});	
	else
	{
		var searchname = req.body.username;	
		console.log(searchname + ' in function');
		var trans = new Record({
				username : searchname
			});
		trans.TransListByAccount(trans.username, function(err,result){
			console.log("data");
			if(err){
				res.render('tradeManage_user', {username:req.session.admin.username,errMsg:"",type:type});
				return;
			}
			else{
				console.log("data");
				res.render('tradeManage_user', {username:req.session.admin.username,errMsg:"",data:result,type:type});
				return;
			}
		});
	}
});

module.exports = router;

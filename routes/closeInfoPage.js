var express = require('express');
var router = express.Router();
var User = require('../models/close.js')

/* GET home page. */
router.get('/',function(req,res){
	//当前要处理的用户id
	var userid=req.query.userid;
	//从session中获取当前登录管理员账号信息
	var admin=req.session.admin;

	var user=new User({});
	user.userCloseInfoPage(userid,function(err,result){
		if(err){
			res.render('closeInfoPage',{username:admin.username, errMsg:err});
			return;
		}
		
		//用户信息详情
		if(result[0]==null){
			console.log('no close requirement');
			res.render('closeInfoPage',{username:admin.username, data:[], errMsg:''});
		}
		else{
			console.log('close requirement list');
			res.render('closeInfoPage',{username:admin.username, data:result[0], errMsg:''});
		}
	});
});



module.exports = router;

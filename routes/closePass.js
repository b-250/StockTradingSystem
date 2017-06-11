var express = require('express');
var router = express.Router();
var User = require('../models/close.js')

/* GET home page. */
router.get('/',function(req,res){
	//当前要处理的用户id和审核结果
	var userid=req.query.userid;
	var status=req.query.status;
	//从session中获取当前登录管理员账号信息
	var admin=req.session.admin;

	var user=new User({});
	user.userClosePass(userid,status,function(err,result){
		if(err){
			res.render('closePass',{username:admin.username, userid:userid, status:status, errMsg:err});
			return;
		}
		
		//用户信息详情
		res.render('closePass',{username:admin.username, userid:userid, status:status});
	});
});



module.exports = router;

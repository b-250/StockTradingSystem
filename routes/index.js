var express = require('express');
var router = express.Router();
var User = require("../models/user.js");
var Admin = require("../models/admin.js");

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index',{ errMsg: '' });
});

router.post("/",function(req, res) {
	//获取form表单提交的登录数据
	var username = req.body.username;
	var password = req.body.password;
	var type	 = req.body.loginType;
	if(type == "user")
		var login = new User({
			username : username,
			password : password
		});
	else if(type == "admin")
		var login = new Admin({
			username : username,
			password : password
		});
	else {
		//res.locals.status = "fail";
		res.render('index', {errMsg: '请选择用户类型' });
		return;
	}
	//通过用户名取到用户信息
	login.userInfo(function(err,result){
	if(err){		
		//res.locals.status = "fail";
		res.render('index', {errMsg: err });
		return;
	}
	if(result == ''){
        //res.locals.status = "fail";
		res.render('index', {errMsg: ' * 用户名或密码错误' });
		return;
	}
	else{
		//判断用户密码是否填写正确  演示没做加密，等有时间再加
		if(result[0]['password'] == password){
			var user = {'username':username};
			req.session.user = user;//保存用户session信息
			
			if(type == "user")
				res.redirect('/main');
			else if(type == "admin")
				res.redirect('/mainManage');
		}
		else{
			//res.locals.status = "fail";
			res.render('index', {errMsg: ' * 用户名或密码错误' });
		}
	}
	});
});

module.exports = router;

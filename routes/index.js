var express = require('express');
var User = require("../models/user.js");
var Admin = require("../models/admin.js");
var router = express.Router();
/*
 var cookieParser = required('cokie-parser');
 var router = express.Router();
 router.use(cookieParser)();
 router.use(session({
 secret: '12345',
 name: 'login_session',
 cokie: {maxAge: 80000},
 resave : false,
 saveUninitialized: true
 }));*/
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index',{ errMsg: '' });
});

router.post("/",function(req, res) {
	//获取form表单提交的登录数据
	var username = req.body.username;
	var password = req.body.password;
	var type	 = req.body.loginType;
	console.log(username);
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
	    var user = {'username':''}
        //res.locals.status = "fail";
        res.send({code: 0, msg: ' * 用户名或密码错误', userinfo : user});
		//res.render('index', {errMsg: ' * 用户名或密码错误' });
		return;
	}
	else{
		//判断用户密码是否填写正确  演示没做加密，等有时间再加
		if(result[0]['password'] == password){
			var user = {'username':username};
			req.session.user = user;//保存用户session信息
			if(type == "user")
			    res.send({code:1, msg:'登录成功', userinfo : user});
			    //res.redirect('/main');
			else if(type == "admin")
				res.redirect('/mainManage');
		}
		else{
			//res.locals.status = "fail";
			res.render('index', {errMsg: ' * 用户名或密码错误' });
		}
	}
	res.end();
	});
});

module.exports = router;

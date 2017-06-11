var express = require('express');
var router = express.Router();
var modifyAdmin = require("../models/admin.js");
var displayAdmin = require("../models/admin.js");
/* GET home page. */
router.get('/', function(req, res, next) {
	var user = req.session.admin;
	var info = new displayAdmin({username : user.username});
	var pass;
	var idcard;
	var phone;
	console.log("username: " + user.username);  
	info.displayInfo(user.username, function(err,result){
	if(err){
		res.render('mainManage_AdminInfo', {errMsg: err });
		return;
	}
	console.log(result);
	pass = new String(result[0].password);  
	idcard = new String(result[0].idcard); 		
	phone = new String(result[0].phone); 
	res.render('mainManage_AdminInfo', { username:user.username, password:pass, idcard:idcard, phone:phone,msg:' '});
	});
});
router.post("/",function(req, res) {
	//获取form表单提交的登录数据
	var oldName = req.session.admin.username;
	var newName = req.body.username;
	var password = req.body.password;
	var idcard	 = req.body.idcard;
	var phone	 = req.body.phone;
	//记录信息
	var update = new modifyAdmin({	
			username : newName,
			password : password,
			idcard : idcard,
			phone : phone	
	});
	update.modifyInfo(oldName, update.username,update.password,update.idcard,update.phone,function(err,result){
		if(err){
			res.render('mainManage_AdminInfo', {errMsg: '修改失败!' });
			return;
		}
		var user = {'username':newName, 'password':password, 'idcard':idcard, 'phone':phone};
		req.session.admin = user;//保存用户session信息
		console.log(req.session.admin.username);
		res.render('mainManage_AdminInfo',{'username':newName, 'password':password, 'idcard':idcard, 'phone':phone,msg:'修改成功！'});
	});	
});
module.exports = router;

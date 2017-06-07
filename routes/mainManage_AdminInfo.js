var express = require('express');
var router = express.Router();
var modifyAdmin = require("../models/admin.js");
var displayAdmin = require("../models/admin.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  var user = req.session.user;
  var info = new displayAdmin({username : user.username});
  var pass;
  var idcard;
  var phone;
  info.displayInfo(user.username, function(err,result){
	if(err){
		res.render('mainManage_AdminInfo', {errMsg: err });
		return;
	}
	pass = new String(result[0].password);  
	idcard = new String(result[0].idcard);  			
	phone = new String(result[0].phone); 
	res.render('mainManage_AdminInfo', { username:user.username, password:pass, idcard:idcard, phone:phone,msg:' '});
  });
});
router.post("/",function(req, res) {
	//获取form表单提交的登录数据	
	var username = req.body.username;
	var password = req.body.password;
	var idcard	 = req.body.idcard;
	var phone	 = req.body.phone;
	console.log("00");
	//记录信息
	var update = new modifyAdmin({	
			username : username,
			password : password,
			idcard : idcard,
			phone : phone	
	});
	console.log("11");
	update.modifyInfo(update.username,update.password,update.idcard,update.phone,function(err,result){
		if(err){
			res.render('mainManage_AdminInfo', {errMsg: '修改失败!' });
			return;
		}
		console.log("22");
		var user = {'username':username, 'password':password, 'idcard':idcard, 'phone':phone};
		req.session.user = user;//保存用户session信息

		res.render('mainManage_AdminInfo',{'username':username, 'password':password, 'idcard':idcard, 'phone':phone,msg:'修改成功！'});
	});
	console.log("33");
	
});
module.exports = router;

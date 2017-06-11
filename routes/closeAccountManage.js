var express = require('express');
var router = express.Router();
var User = require('../models/close.js')

/* GET home page. */
router.get('/',function(req,res){
	//从session中获取当前登录管理员账号信息
	var admin=req.session.admin;

	var user=new User({});
	user.userCloseInfo(function(err,result){
		if(err){
			res.render('closeAccountManage',{username:admin.username, errMsg:err});
			return;
		}
		if(result==''){
			console.log('no close requirement');
			res.render('closeAccountManage',{username:admin.username, data:[], errMsg:''});
		}
		else{
			//待销户用户列表
			var data=[];
			for(var i=0;i<result.length;i++){
				//console.log(result[i]['userid']);
				data.push(result[i]);
			}
			console.log('close requirement list')
			res.render('closeAccountManage',{username:admin.username, data:data, errMsg:''});
		}
		console.log(data);
	});
});



module.exports = router;

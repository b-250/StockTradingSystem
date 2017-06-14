var express = require('express');
var router = express.Router();
var Record = require("../models/record.js");

router.get('/', function(req, res, next) {
	var username = req.session.admin.username;
	var type = req.session.admin.type;
	res.render('tradeManage_stock', {username:username, errMsg:'',data:'',type:type});		
});

router.post('/', function(req, res) {
	var user = req.session.admin;	
	var type = req.session.admin.type;
	if(user.type == "low")
		res.render('tradeManage_stock', {username:req.session.admin.username,errMsg:'权限不足，无法查看',data:'',type:type});	
	else
	{
		var stock_id = req.body.stock_id;	
		console.log(stock_id + ' in function');
		var trans = new Record({
			code : stock_id
		});
		trans.TransListByCode(trans.code, function(err,result){
			if(err){
				res.render('tradeManage_stock', {username:req.session.admin.username,errMsg:"",type:type});
				return;
			}
			else{
				res.render('tradeManage_stock', {username:req.session.admin.username,errMsg:"",data:result,type:type});
				return;
			}
		});	
	}
});

module.exports = router;

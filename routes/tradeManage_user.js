var express = require('express');
var router = express.Router();
var Transaction = require("../models/transaction.js");

router.get('/', function(req, res, next) {
	res.render('tradeManage_user', {errMsg:'',data:''});
});

router.post('/', function(req, res) {
	var username = req.body.username;	
	console.log(username + ' in function');
	var trans = new Transaction({
			account : username
		});
	trans.TransListByAccount(trans.account, function(err,result){
		console.log("data");
		if(err){
			res.render('tradeManage_user', {errMsg:""});
			return;
		}
		else{
			console.log("data");
			res.render('tradeManage_user', {data:result});
			return;
		}
	});
	//res.render('tradeManage_user', { username:user.username});
});

module.exports = router;

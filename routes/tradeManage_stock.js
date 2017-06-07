var express = require('express');
var router = express.Router();
var Transaction = require("../models/transaction.js");

router.get('/', function(req, res, next) {
	res.render('tradeManage_stock', {errMsg:'',data:''});
});

router.post('/', function(req, res) {
	var stock_id = req.body.stock_id;	
	console.log(stock_id + ' in function');
	var trans = new Transaction({
			code : stock_id
		});
	trans.TransListByCode(trans.code, function(err,result){
		console.log("data");
		if(err){
			res.render('tradeManage_stock', {errMsg:""});
			return;
		}
		else{
			console.log("data");
			res.render('tradeManage_stock', {data:result});
			return;
		}
	});
	//res.render('tradeManage_stock', { username:user.username});
});

module.exports = router;

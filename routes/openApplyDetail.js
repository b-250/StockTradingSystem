/*Author: Zhou Shuyue*/
var express = require('express');
var router = express.Router();
var displayApplyDetail = require("../models/open.js");


/* GET home page. */
router.get('/', function(req, res, next) {
	var user = req.session.admin;
	var name = req.query.name;
	console.log(name);
	var applyDetail = new displayApplyDetail();
	applyDetail.openApplyDetail(name, function(err,result){
		 if(err){
		res.render('manageOpenAccount', {errMsg: err });
		return;
		}
		console.log(result); 
		res.render('openApplyDetail', { username:user.username, data:result});
	});


});
module.exports = router;


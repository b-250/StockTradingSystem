/*Author: Zhou Shuyue*/
var express = require('express');
var router = express.Router();
var displayApplyDetail = require("../models/open.js");


/* GET home page. */
router.get('/', function(req, res, next) {
	var admin = req.session.admin;
	var name = req.query.name;
	var type = req.session.admin.type;
	console.log(name);
	var applyDetail = new displayApplyDetail();
	applyDetail.openApplyDetail(name, function(err,result){
		 if(err){
		res.render('manageOpenAccount', {username:admin.username, errMsg: err, data:[],type:type});
		return;
		}
		res.render('openApplyDetail', { username:admin.username,  errMsg: "",  data:result[0],type:type});
		console.log(result);
	});


});
module.exports = router;


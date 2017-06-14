/*Author: Zhou Shuyue*/
var express = require('express');
var router = express.Router();
var openApplyProcess = require("../models/open.js");


/* GET home page. */
router.get('/', function(req, res, next) {
	var user = req.session.admin;
	var type = req.session.admin.type;
	var id = req.query.id;
	 console.log("here"); 
	var process = new openApplyProcess();
	process.rejectApply(id,function(err,result){
		if(err){
		res.render('openApplyReject', {errMsg: err });
		return;
		}
		console.log(result);			
	});
	res.render('openApplyReject', { username:user.username,type:type});
});
module.exports = router;


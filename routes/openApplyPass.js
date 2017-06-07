/*Author: Zhou Shuyue*/
var express = require('express');
var router = express.Router();
var openApplyProcess = require("../models/open.js");


/* GET home page. */
router.get('/', function(req, res, next) {
	var user = req.session.user;
	var id = req.query.id;
	 console.log("here"); 
	var process = new openApplyProcess();
	process.passApply(id,function(err,result){
		if(err){
		res.render('openApplyPass', {errMsg: err });
		return;
		}
		 console.log(result); 			
		});
	res.render('openApplyPass', { username:user.username});

});
module.exports = router;


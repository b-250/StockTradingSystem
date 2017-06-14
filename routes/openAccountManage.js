/*Author: Zhou Shuyue*/
var express = require('express');
var router = express.Router();
var displayApply = require("../models/open.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = req.session.admin;
  var type = req.session.admin.type;
  var openApplyUser = new displayApply();
   var data = new Array();
	
	 openApplyUser.openApplyInfo(function(err,result){
		 if(err){
		res.render('openAccountManage', {errMsg: err });
		return;
		}
		 console.log(result);   
		res.render('openAccountManage', { username:user.username, password:user.password,data:result,type:type});

	 });

});

module.exports = router;


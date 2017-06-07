var express = require('express');
var router = express.Router();
var displayApply = require("../models/open.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = req.session.user;
  var openApplyUser = new displayApply();
   var data = new Array();
	
	//console.log("321");
	 openApplyUser.openApplyInfo(function(err,result){
		 if(err){
		res.render('openAccountManage', {errMsg: err });
		return;
		}
		 console.log(result);   
		/*for(var k = 0; k < result.length; k++)
			data[k] = new Array();
		for(var i = 0; i < result.length; i++)
		{
			data[i][0] = new String(result[i].userid);  
			data[i][1] = new String(result[i].name);  
			if(result[i].gender == 1)
				data[i][2] = new String("男");
			else
				data[i][2] = new String("女");
			data[i][3] =  new String(result[i].id_card);
			data[i][4] =  new String(result[i].phone);
		}*/
         
		res.render('openAccountManage', { username:user.username, password:user.password,data:result});

	 });

});

module.exports = router;


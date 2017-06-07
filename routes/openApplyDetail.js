var express = require('express');
var router = express.Router();
var displayApplyDetail = require("../models/open.js");


/* GET home page. */
router.get('/', function(req, res, next) {
	var user = req.session.user;
	var name = req.query.name;
	//var data = new Array();
	//console.log("why!!");
	console.log(name);
	var applyDetail = new displayApplyDetail();
	applyDetail.openApplyDetail(name, function(err,result){
		 if(err){
		res.render('manageOpenAccount', {errMsg: err });
		return;
		}
		 console.log(result);  
		//for(var i = 0; i < result.length; i++)
		//{
		/*	data[0] = new String(result[0].userid);  
			data[1] = new String(result[0].usertype);  
			
			data[2] = new String(result[0].userstatus); 
			data[3] = new String(result[0].username); 
			data[5] = new String(result[0].idcard); 
			data[6] = new String(result[0].name); 
			 
			if(result[0].gender == 1)
				data[7] = new String("male");
			else
				data[7] = new String("female");
			data[8] = new String(result[0].phone); 
			*/
		//}
		//console.log("why!!");
		res.render('openApplyDetail', { username:user.username, data:result});
	});


});
module.exports = router;


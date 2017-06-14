/*Author: Zihan Zhao of A1*/
var express = require('express');
var router = express.Router();
var User = require("../models/user.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('loss',{errMsg:''});
});

router.post('/',function(req, res) {
    var username	 = req.body.username;
    var idnumber	 = req.body.idnumber;
    var name		 = req.body.name;
    var lossReport = new User({
            username : username,
			id_card	 : idnumber,
			name	 : name
			});    
	console.log(lossReport.username);
	console.log(lossReport.id_card);
	console.log(lossReport.name);
	//通过用户名取到用户信息	
    lossReport.userInfo(function(err,result){
        if(err){
            //res.locals.status = "fail";
            var user = {'username':''};
            res.send({code: 0, msg: err, userinfo : user});
            //res.render('index', {errMsg: err });
            return;
        }
        else{
			console.log(result);
            //判断用户身份信息是否填写正确			
            if(result == ""){
                //res.locals.status = "fail";
                var user = {'username':''};
                //res.locals.status = "fail";
                console.log('* 用户信息有误');				
				res.render('loss', {errMsg:"用户信息有误"});
            }
			else if(result[0].id_card == idnumber
			 && result[0].name 	 == name && result[0].userstatus == "LossReport")
			 {
				 console.log('* 用户信息有误');				
				res.render('loss', {errMsg:"您已提交过挂失申请，请耐心等待管理员审核"});
			 }
			else if(result[0].id_card == idnumber
			 && result[0].name 	 == name)
			 {
				lossReport.lossReport(function (err, results) {
				if(err){
					console.log("invalid Apply to close account");					
					res.render('loss', {errMsg:"挂失申请失败"});
					return;
				}
				else
				{				
					res.render('loss', {errMsg:"挂失申请成功,请等待管理员审核"});
					return;
				}
			});
                
            }
        }
    });   
});

module.exports = router;

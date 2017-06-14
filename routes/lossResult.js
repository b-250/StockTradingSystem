var express = require('express');
var router = express.Router();
var User = require("../models/loss.js");



router.get('/', function(req, res) {

var username = req.query.username;
var type = req.session.admin.type;
var user=new User({});
user.userDelete(username, function(err,result){
  if(err){
    res.render('lossResult', {username:username, errMsg:"", data:"",type:type});
  }else{
    res.render('lossResult', {username:username, errMsg:"", data:result,type:type });
  }
});


});


module.exports = router;

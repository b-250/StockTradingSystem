var express = require('express');
var router = express.Router();
var User = require("../models/user.js");
var Record = require("../models/record.js");
var Userstock = require("../models/userstock.js");
/* GET home page. */
router.get('/', function(req, res, next) {

	var username = req.session.user.username;
	var userstock = new Userstock({
		account : username
	});
	userstock.userrecordInfo(function(err,result){
		var record = new Record({code:10});
		record.recordInfo(function(err,result){

			res.render('traderecord', {data: result});
		});
	});
});
module.exports = router;
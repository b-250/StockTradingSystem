var express = require('express');
var router = express.Router();
var Record = require("../models/record.js");
/* GET home page. */

router.get('/', function(req, res, next) {
    var username = req.session.user.username;
	var record = new Record({
		username:username
	});
	record.recordInfo(function(err,result){
		res.render('traderecord', {data: result});
		console.log(result);
	});
});
module.exports = router;

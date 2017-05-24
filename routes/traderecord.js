var express = require('express');
var router = express.Router();
var User = require("../models/user.js");
var Record = require("../models/record.js");
/* GET home page. */
router.get('/', function(req, res, next) {
	var record = new Record({code:'000001'});
	record.recordInfo(function(err,result){
		res.render('traderecord', {data: result});

	});
});


module.exports = router;

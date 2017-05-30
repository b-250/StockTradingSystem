var express = require('express');
var router = express.Router();
var Userstock = require("../models/userstock.js");

/* GET home page. */
router.get('/', function(req, res) {
	var userstock = new Userstock({
		account : 'Sakura'
	});
	userstock.userstockInfo(function(err,result){
		res.render('userstock', {data: result});

	});
  
});

module.exports = router;
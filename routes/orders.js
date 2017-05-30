var express = require('express');
var router = express.Router();
var Orders = require("../models/orders.js");

/* GET home page. */
router.get('/', function(req, res) {
	var orders = new Orders({
		userAccount : '0'
	});
	orders.ordersInfo(function(err,result){
		res.render('orders', {data: result});

	});
  
});

module.exports = router;
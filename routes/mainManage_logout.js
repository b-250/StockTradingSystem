var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	req.session.admin.username = "";
	res.redirect('/');
});

module.exports = router;
var mysql = require('mysql');

var pool = mysql.createPool({
      host : 'tdsql-219vguff.sh.cdb.myqcloud.com',
      user : 'group1',
      password :'group1..',
      database:'stockg1',
      port : 23
  });
  
//可以监听connection事件，并设置session值
pool.on('connnection',function(connection){
  console.log("pool on");
  connection.query('SET SESSION auto_increment_increment=1')
});

function Transaction(trans){
	this.number	  = trans.number;
	this.code	  = trans.code;
	this.time	  = trans.time;
	this.type	  = trans.type;
	this.volume	  = trans.volume;
	this.price	  = trans.price;
	this.during	  = trans.during;
	this.id		  = trans.id;
	this.account  = trans.account;
}

//根据用户名得到交易
Transaction.prototype.TransListByAccount = function(account, callback) {
    console.log("TransListByAccount");
	console.log(account + "in model");
    var SELECT_TRANS = "SELECT * FROM backend WHERE account = ?";
	pool.getConnection(function(err,connection){
		console.log("TransListByAccount_pool");
		connection.query(SELECT_TRANS,[account],function(err,result){
			if (err) {
				console.log("SELECT_TRANS(account) Error: " + err.message);
				return;
			}
			connection.release();
			callback(err,result);
		});
	});
}

//根据股票名得到交易
Transaction.prototype.TransListByCode = function(code, callback) {
    console.log("TransListByCode");
	console.log(code + "in model");
    var SELECT_TRANS = "SELECT * FROM backend WHERE code = ?";
	pool.getConnection(function(err,connection){
		connection.query(SELECT_TRANS,[code],function(err,result){
			if (err) {
				console.log("SELECT_TRANS(code) Error: " + err.message);
				return;
			}
			connection.release();
			callback(err,result);
		});
	});
}
module.exports = Transaction;

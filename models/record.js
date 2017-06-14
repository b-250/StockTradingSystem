var mysql = require('mysql');

//创建连接池 createPool(Object)
// Object和createConnection参数相同。
/*var pool = mysql.createPool({
      host : '112.74.124.145',
      user : 'group1',
      password :'group1',
      database:'stockG1',
      port : 3306
  });*/
var pool = mysql.createPool({
      host : '182.254.128.133',
      user : 'group1',
      password :'group1..',
      database:'stockg5',
      port : 26
  });
//可以监听connection事件，并设置session值
pool.on('connnection',function(connection){
  console.log("pool on");
  connection.query('SET SESSION auto_increment_increment=1')
});

function Record(record){
  this.username = record.username;
  this.code = record.code;
  this.date = record.date;
  this.time = record.time;
  this.price = record.price;
  this.change = record.change;
  this.volume = record.volume;
  this.amount = record.amount;
  this.type = record.type;
}
//用户个人交易记录
Record.prototype.recordInfo = function(callback){
	var record = {
		username : this.username,
		code : this.code,
		date : this.date,
		time : this.time,
		price : this.price,
		change : this.change,
		volume : this.volume,
		amount : this.amount,
		type : this.type
	};
	console.log(record.username);
	var SELECT_RECORD ="SELECT * FROM traderecords WHERE purchaser = ?";
	pool.getConnection(function(err,connection){
			connection.query(SELECT_RECORD,[record.username],function(err,result){		
				console.log(SELECT_RECORD);
				if (err) {
					console.log("SELECT_RECORD Error: " + err.message);
					return;
				}
				connection.release();
				callback(err,result);
				console.log(result);
			});
		});
	}

//根据用户名得到交易
Record.prototype.TransListByAccount = function(account, callback) {
    var SELECT_TRANS = "SELECT * FROM traderecords WHERE purchaser = ? OR seller = ?";
	pool.getConnection(function(err,connection){
		console.log("TransListByAccount_pool");
		connection.query(SELECT_TRANS,[account,account],function(err,result){
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
Record.prototype.TransListByCode = function(code, callback) {
    var SELECT_TRANS = "SELECT * FROM traderecords WHERE code = ?";
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
	

module.exports = Record;

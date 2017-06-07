/*Author: Zhao Zihan*/
/**/
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

function Admin(admin){
  this.username = admin.username;
  this.password = admin.password;
  this.idcard 	= admin.idcard;
  this.phone 	= admin.phone;
  this.type		= admin.type;
}

//根据用户名得到用户数量
Admin.prototype.userNum = function(username, callback) {
  pool.getConnection(function(err,connection){
    console.log("getConnection");
    console.log("getUserNumByName");
    var SELECT_NUM = "SELECT COUNT(1) AS num FROM admin WHERE USERNAME = ?";
    connection.query(SELECT_NUM, [username], function (err, result) {
      if (err) {
        console.log("SELECT_NUM Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
};

Admin.prototype.userInfo = function(callback){
 var user = {
    username : this.username,
    password : this.password,
	idcard 	 : this.idcard,
	phone    : this.phone,
	type	 : this.type };
 
  var SELECT_LOGIN ="SELECT * FROM admin WHERE USERNAME = ?";
  pool.getConnection(function(err,connection){
    connection.query(SELECT_LOGIN,[user.username],function(err,result){
      if (err) {
        console.log("SELECT_LOGIN Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
}

Admin.prototype.userReportLoss = function(callback){
  var user = {
	userstatus : 1
  }
  var SELECT_LOGIN ="SELECT * FROM admin WHERE userstatus = ?";
  pool.getConnection(function(err,connection){
    connection.query(SELECT_LOGIN, [user.userstatus], function(err,result){
      if (err) {
        console.log("SELECT_LOGIN Error: " + err.message);
        return;
      }
      connection.release();
      console.log(result);
      callback(err,result);
    });
  });
}

Admin.prototype.displayInfo = function(username, callback){
  var SELECT_INFO ="SELECT  password, idcard, phone FROM admin WHERE USERNAME = ?";
  pool.getConnection(function(err,connection){
    connection.query(SELECT_INFO,[username],function(err,result){
      if (err) {
        console.log("SELECT_INFO Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
}

Admin.prototype.modifyInfo = function(oldName, newName,password,idcard,phone,callback){
  var UPDATE_INFO ="UPDATE admin SET USERNAME = ?, PASSWORD = ?,IDCARD = ?, PHONE = ? WHERE USERNAME = ?";
  pool.getConnection(function(err,connection){
    connection.query(UPDATE_INFO,[newName,password,idcard,phone,oldName],function(err,result){
      if (err) {
        console.log("UPDATE_INFO Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
}

module.exports = Admin;

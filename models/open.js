var mysql = require('mysql');

/*var pool = mysql.createPool({
      host : '127.0.0.1',
      user : 'root',
      password :'',
      database:'nodedb',
      port : 3306
  });*/
var pool = mysql.createPool({
      host : '182.254.128.133',
      user : 'group1',
      password :'group1..',
      database:'stockg1',
      port : 26
  });
  
 pool.on('connnection',function(connection){
  console.log("pool on");
  connection.query('SET SESSION auto_increment_increment=1')
});

function Open(){
}

Open.prototype.openApplyInfo = function(callback){
 
  var SELECT_DISPLAY = "SELECT userid, username, name, gender,id_card, phone FROM useraccount WHERE userstatus = 'OpenApply'";
	 pool.getConnection(function(err,connection){
    connection.query(SELECT_DISPLAY,function(err,result){
      if (err) {
        console.log("SELECT_LOGIN DISPLAY: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
}

Open.prototype.openApplyDetail = function(userid,callback){
 
  var SELECT_DETAIL = "SELECT * FROM useraccount WHERE userid = ?";
	 pool.getConnection(function(err,connection){
    connection.query(SELECT_DETAIL,[userid],function(err,result){
      if (err) {
        console.log("SELECT_DETAIL: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
}

Open.prototype.passApply = function(userid,callback){
 
  var UPDATE_APPLY = "UPDATE useraccount set userstatus ='Valid' WHERE userid = ?";
	 pool.getConnection(function(err,connection){
    connection.query(UPDATE_APPLY,[userid],function(err,result){
      if (err) {
        console.log("UPDATE_APPLY: " + err.message);
        return;
      }
	  console.log("there!")
      connection.release();
      callback(err,result);
    });
  });
}

Open.prototype.rejectApply = function(userid,callback){
 
  var UPDATE_APPLY = "UPDATE useraccount set userstatus ='OpenReject' WHERE userid = ?";
	 pool.getConnection(function(err,connection){
    connection.query(UPDATE_APPLY,[userid],function(err,result){
      if (err) {
        console.log("UPDATE_APPLY: " + err.message);
        return;
      }
	  console.log("there!")
      connection.release();
      callback(err,result);
    });
  });
}

module.exports = Open;
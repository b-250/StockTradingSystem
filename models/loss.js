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

function User(){
}

User.prototype.userInfo = function(username, callback){
  console.log("loss-username:"+username);
  var SELECT_INFO ="SELECT * FROM useraccount WHERE username = ?";
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

User.prototype.userList = function(callback){
  var SELECT_INFO ="SELECT * FROM useraccount WHERE userstatus = 'LossReport'";
  pool.getConnection(function(err,connection){
    connection.query(SELECT_INFO, function(err,result){
      if (err) {
        console.log("SELECT_LIST ERR: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
}

User.prototype.userDelete = function(username, callback){
  console.log("agree");
  var LOSS_AGREE = "UPDATE useraccount SET userstatus = 'LossPass' WHERE username = ?";
  var SELECT_LEFT = "SELECT FROM useraccount WHERE userstatus = 'LossReport'";
    pool.getConnection(function(err,connection){
        connection.query(LOSS_AGREE,[username],function(err,result){
        if (err) {
          console.log("LOSS_AGREE Error: " + err.message);
          return;
        }
        //connection.release();
        });
        connection.query(SELECT_LEFT,function(err1,result1){
          if(err){
            console.log("AFTER DELETE LINK:"+err.message);
            return;
          }
          connection.release();
          callback(err1,result1);
        });
  });
}

User.prototype.userRefuse=function(username, callback){
	console.log("disagree");
	var DISAGREE = "UPDATE useraccount SET userstatus = 'Valid' WHERE username = ?";
	pool.getConnection(function(err,connection){
		connection.query(DISAGREE,[username],function(err,result){
			if(err){
				console.log("DISAGREE_UPDATE Error:"+err.message);
				return;
			}
			connection.release();
			callback(err,result);
		});
	});
}

module.exports = User;

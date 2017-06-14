var mysql=require('mysql');

var pool = mysql.createPool({
      host : '182.254.128.133',
      user : 'group1',
      password :'group1..',
      database:'stockg1',
      port : 26
  });
pool.on('connection',function(connection){
	console.log("closePage: pool on");
	connection.query('SET SESSION auto_increment_increment=1');
});

function User(){
}

User.prototype.userClosePass=function(userid,status,callback){
	if(status=="true"){
		var UPDATE="UPDATE useraccount SET userstatus = 'ClosePass' WHERE userid = ?";
	}
	else{
		var UPDATE="UPDATE useraccount SET userstatus = 'CloseNotPass' WHERE userid = ?";
	}
	var SELECT="SELECT * FROM useraccount WHERE userid = ?";

	pool.getConnection(function(err,connection){
		connection.query(UPDATE,[userid],function(err,result){
			if(err){
				console.log("UPDATE_CLOSE_STATUS Error: "+err.message);
				return;
			}
			connection.release();
			callback(err,result);
		});
	});
}

User.prototype.userCloseInfo = function(callback){
  var SELECT_CLOSE ="SELECT * FROM useraccount WHERE userstatus = 'CloseApply'";//销户列表
  pool.getConnection(function(err,connection){
    connection.query(SELECT_CLOSE,function(err,result){
      if (err) {
        console.log("SELECT_CLOSE Error: " + err.message);
        return;
      }
      connection.release();
      callback(err,result);
    });
  });
}

User.prototype.userCloseInfoPage=function(userid,callback){
	var SELECT_PAGE="SELECT * FROM useraccount WHERE userid = ?";
	pool.getConnection(function(err,connection){
		connection.query(SELECT_PAGE,[userid],function(err,result){
			if(err){
				console.log("SELECT_PAGE Error: "+err.message);
				return;
			}
			connection.release();
			callback(err,result);
		});
	});
}

module.exports=User;

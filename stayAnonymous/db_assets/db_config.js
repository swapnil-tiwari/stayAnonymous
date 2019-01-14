var mysql = require('mysql');
var stayAnonymous=require('./db_credentials.js');
var con = mysql.createConnection(stayAnonymous);
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE users (sno INT AUTO_INCREMENT PRIMARY KEY,userID VARCHAR(255), username VARCHAR(255),email VARCHAR(255),imgURL VARCHAR(255))";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
    });
  });
  
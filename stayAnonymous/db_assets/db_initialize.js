var mysql = require('mysql');
global.db=null;
var creds=require('./db_credentials.js');
//var con = mysql.createConnection(creds);
// con.connect(function(err)
// {
//   if(err) throw err;
//   console.log("Connected with stayAnonymous")

// });
async function connect()
{
    if(global.db)return global.db;
    return new Promise((res,rej)=>
    {
        let con=mysql.createConnection(creds);
        var conerror=(e)=>{global.db=null;console.info('db disconnected');};
        con.connect((err)=>
        {
            if(err)conerror(err);
            else global.db=con;
            console.info('db connected')
            res(global.db);
        });
        con.on('error',conerror);
    })
}
//console.log(stayAnonymous);
exports.registerUser=async function (uid,uname,email,img)
{
  if(!global.db)global.db=await connect();
      global.db.query(`SELECT * FROM users WHERE userID='${uid}'`, function (err, result, fields) {
        if (err) throw err;
        // console.log(result.length);
        if(result.length)
        {
          console.log("User already existing. Skipping current User!");
          return;
        }
        var sql = `INSERT INTO users (userID, username, email, imgURL) VALUES ('${uid}', '${uname}', '${email}', '${img}')`;
        global.db.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Record inserted");
        });  
        
      });      
}
exports.fetchUser=async function (uid)
{
  
  
  if(!global.db)global.db=await connect();
  return new Promise(function(res,rej)
  {
    var user={};
    global.db.query(`SELECT * FROM users WHERE userID='${uid}'`, function (err, result, fields) {
      if (err) throw err;
  
      if(!result.length)
          {
            console.log("User Not Found");
            
            rej ("User Not Found")
          }
      else{
          console.log('user found');
          user.userid=result[0].userID;
          user.username=result[0].username;
          user.useremail=result[0].email;
          user.imgURL=result[0].imgURL;
          res (user);
      }
        
    });

  });
  

}
exports.saveMsg=async function (uid,msg)
{
  if(!global.db)global.db=await connect();
  var sql = `INSERT INTO messages (userID, msgs) VALUES ('${uid}', '${msg}')`;
  global.db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Message inserted");
  });

}
exports.fetchMsgs=async function (uid)
{
  if(!global.db)global.db=await connect();
  return new Promise(function(res,rej)
  {
    global.db.query(`SELECT * FROM messages WHERE userID='${uid}' ORDER BY sno DESC`, function (err, result, fields) {
      if (err) throw err;
      else{
        res(result);
      }
  
    });

  });
  
}
process.on('uncaughtException',console.log)






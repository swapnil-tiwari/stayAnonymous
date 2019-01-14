var express=require('express');
var app=express();
var bodyParser = require('body-parser')
var db_functions=require('./db_assets/db_initialize.js');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('./'));
app.use(bodyParser.json({extended : true}));
app.post('/register',function(req,res){
    var uid=req.body.userid;
    var uname=req.body.username;
    var email=req.body.email;
    var img=req.body.imgUrl;
    db_functions.registerUser(uid,uname,email,img);
    res.json({status:"200",message:"success"});

})
app.get('/fetchuser',async function(req,res)
{
    var user={};
    var uid=req.param('uid');
    try{
        user=await db_functions.fetchUser(uid);
        res.json(user);
    }
    catch (e)
    {
        res.json({code:"204",status:"User Not Found"});
    }
    
    console.log(user);

});
app.post('/postmsg',function (req,res){
    var msg=req.body.postedmsg;
    var uid=req.body.uid;
    db_functions.saveMsg(uid,msg);
    res.json({code:200, status:"Success"});

});
app.get('/fetchmsgs',async function (req,res)
{
    var msgsarray=[];
    var uid=req.param('uid');
    try{
        msgsarray=await db_functions.fetchMsgs(uid);
        res.json(msgsarray);
    }
    catch (e)
    {
        res.json({code:205,status:"Some Internal Error"});
    }

})
process.on('uncaughtException',console.log);
app.listen(process.env.PORT||80);
console.log('Server running at port:80');

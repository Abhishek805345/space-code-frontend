
const express=require('express');
const path=require('path');
//socket-client
const { io } = require("socket.io-client");

//local module
const services=require('./services/backendconnector');
const projectservices=require('./services/roomserviceapi');

const app=express();                                                 //after all this add socket.io in html file using predefined script src
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));




app.get('/',async (req,res,next)=>{
    // const result=await services.sess();
    // console.log(result);
    // if (result.login==false){
    //    res.sendFile(path.join(__dirname,'public','first.html'));
    // }else{
    //   res.render('home',{data:req.session});
    // }
    res.sendFile(path.join(__dirname,'public','first.html'));
   
})
app.get('/about',(req,res,next)=>{
  res.sendFile(path.join(__dirname,'public','about.html'));
})
app.get('/home',(req,res,next)=>{
  res.sendFile(path.join(__dirname,'public','first.html'));
})
app.get('/post-home/:id',async (req,res,next)=>{
  const userid=req.params.id;
  const result=await services.userdetails(userid);
  res.render('home',{data:result});
})


app.get('/register', (req,res,next)=>{
  res.render('register',{error:[]});
})
app.post('/post-register',async (req,res,next)=>{
const data=req.body;
console.log("registered data is ",data);
const result=await services.login_data(data);
if (result.user==true){
  res.render('register',{error:["user already exists"]});
}else{
  res.redirect('/login-in');
}

})
app.get('/login-in',(req,res,next)=>{
  res.sendFile(path.join(__dirname,'public','login.html'));
})
app.post('/login',async (req,res,next)=>{
  console.log(req.body);
  const result=await services.logincheck(req.body);
  console.log(result);
  if (result.user==false){
    res.sendFile(path.join(__dirname,'public','nouser.html'))
  }else if (result.login==true){
    res.render('home',{data:result});
  }else{
    res.send(result.message);
  }
})
//logout
app.get('/logout/:id',async (req,res,next)=>{
  const userid=req.params.id;
  console.log('user id is =',userid);
  const result=await services.logoutsave(userid);
  console.log(result);
  res.redirect('/');
})

//forgot password
app.get('/forgot',(req,res,next)=>{
  res.sendFile(path.join(__dirname,'public','forgot.html'));
})
app.post('/forgot-password',async (req,res,next)=>{
  const data=req.body;
  const result=await services.sendmail(data);
  if (result.otpstatus==true){
    res.render('otp',{id:result.userid});
  }else{
    res.sendFile(path.join(__dirname,'public','nouser.html'));
  }
})
app.post('/verify-otp/:id',async (req,res,next)=>{
  const id=req.params.id;
  const otp=req.body;
  console.log("user otp is ",otp);
  const result=await services.validateotp(otp,id);
  console.log("json result is ",result);
  if (result.forgoting==true){
    res.render('newpas',{id:result.userid});
  }else{
    res.sendFile(path.join(__dirname,'public','wrongotp.html'));
  }
})
//saving the new password 
app.post('/reset-password/:id',async (req,res,next)=>{
  const id=req.params.id;
  const data=req.body;
  console.log('new pas is ',data);
  const result=await services.savepass(data,id);
  if (result){
    res.redirect('/login-in');
  }
})

//creating a new project middleware
app.get('/create-project/:id',(req,res,next)=>{
  const id=req.params.id;
  res.render('addinfo',{_id:id});
})
app.post('/post-req',async (req,res,next)=>{
  const data=req.body;
  const returneddata=await projectservices.saveroominfo(data);
  console.log(returneddata);
  if (returneddata.result.acknowledged==true){
    res.render('room',{data:returneddata.data,roomid:returneddata.result.insertedId});
  }
})
app.get('/get-room/:id',async (req,res,next)=>{
  const userid=req.params.id;
  const result=await projectservices.fetchrooms(userid);
  //fetching user details
  const userdata=await services.userdetails(userid);
  res.render('myrooms',{data:result,userdata:userdata});
})
//inviting middleware
app.get('/invite-mem/:id',async (req,res,next)=>{
  const roomid=req.params.id;
  const roomdata=await projectservices.findmyroom(roomid);
  console.log("room details are",roomdata);
  console.log("host id fetched from room data is ",roomdata.hostid);
  const userdata=await services.userdetails(roomdata.hostid);
  
  console.log('user logged in data is ',userdata);
  res.render('invite',{roomid:roomid,userdata:userdata});
})
//user email data to send invite
app.post('/invite-user',async (req,res,next)=>{
  const data=req.body;
  console.log('user email is ',data);
  const result=await projectservices.inviteuser(data);
  console.log(result);
  if (result.status==true){
     res.sendFile(path.join(__dirname,'public','done.html'));
  }else if (result.status==false){
    res.sendFile(path.join(__dirname,'public','nomoreuser.html'));
  }else if (result.user==false){
    res.render('nouser',{user:data.email});
   }
})
//enter room middleware 
app.get('/room/:id',async  (req,res,next)=>{
  const roomid=req.params.id;
  const roomdata=await projectservices.findmyroom(roomid);
  console.log("this is the final room data",roomdata);
  res.render('specificroom',{data:roomdata});
});

app.listen(3000,()=>{
  console.log(`Your server is running at http:localhost:3000`);
})

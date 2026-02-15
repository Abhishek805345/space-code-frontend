
const express=require('express');
const path=require('path');
//socket-client
const { io } = require("socket.io-client");

//local module
const services=require('./services/backendconnector');
const projectservices=require('./services/roomserviceapi');

const app=express();                                                 //after all this add socket.io in html file using predefined script src
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));




app.get('/',async (req,res,next)=>{
    // const result=await services.sess();
    // console.log('session request result is',result);
    // if (result.login==false){
    //    res.sendFile(path.join(__dirname,'public','first.html'));
    // }else if (result.login==true){
    //   let data={
    //     result
    //   }
    //   res.render('home',{data:data});
    // }
    res.sendFile(path.join(__dirname,'public','index.html'));
    
   
})
app.get('/about',(req,res,next)=>{
  res.sendFile(path.join(__dirname,'public','about.html'));
})
app.get('/home',(req,res,next)=>{
  res.sendFile(path.join(__dirname,'public','index.html'));
})
app.get('/post-home/:id',async (req,res,next)=>{
  const userid=req.params.id;
  const data=await services.userdetails(userid);
  newdata={
    data
  }
  console.log("this is my data",newdata);
  res.render('home',{data:newdata});
})


app.get('/register', (req,res,next)=>{
  res.render('register',{error:[],errorusername:[]});
})
app.post('/post-register',async (req,res,next)=>{
const data=req.body;
console.log("registered data is ",data);
const result=await services.login_data(data);
if (result.username==true){       //username is present to allot
if (result.gmail==true){            //email already exists in db
  res.render('register',{error:["user already exists"],errorusername:[]});
}else{                                  //email does not exsits new user added to db and now redirect to login page
  res.redirect('/login-in');
}
}else{
  res.render('register',{errorusername:['user name already exists'],error:[]});
}

});

app.get('/login-in',(req,res,next)=>{
  res.render('login',{error:[],errorpas:[]});
})
app.post('/login',async (req,res,next)=>{
  console.log(req.body);
  const result=await services.logincheck(req.body);
  console.log('result is this in this page', result);
  if (result.user==false){
    res.render('login',{error:["no user found plz register first"],errorpas:[]})
  }else if (result.login==true){
    res.redirect(`/after-home/${result.data._id}`);
  }else{
    res.render('login',{error:[],errorpas:['Wrong password try again']});
  }
})
app.get('/after-home/:id',async (req,res,next)=>{
  const userid=req.params.id;
  console.log('user id is ',userid);
  const result=await services.userdetails(userid);
  let data={
    data:result
  }
  console.log('destructured adata is',data);
  res.render('home',{data:data});

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
//account settings
app.get('/account/setting/:id',async (req,res,next)=>{
  const userid=req.params.id;
  const result=await services.userdetails(userid);
  res.render('setting',{userdata:result});
})

//creating a new project middleware
app.get('/create-project/:id',(req,res,next)=>{
  const id=req.params.id;
  res.render('addinfo',{_id:id});
})
app.post('/post-req',async (req,res,next)=>{
  const data=req.body;
  const returneddata=await projectservices.saveroominfo(data);
  console.log('this is the final data',returneddata);
  if (returneddata.result.acknowledged==true){
    res.render('created',{roomid:returneddata.result.insertedId,userid:returneddata.data._id});
  }
})
//middleware for codding rooms it shows only coding rooms
app.get('/get-room/:id',async (req,res,next)=>{
  const userid=req.params.id;
  const result=await projectservices.fetchrooms(userid);
  let array=[];
  result.forEach(room=>{
      if (room.roomType=='Code'){
        array.push(room);
  }
  })
  //fetching user details
  const userdata=await services.userdetails(userid);
  res.render('myrooms',{data:array,userdata:userdata});
})
//middleware for interview rooms
app.get('/get-interview-room/:id',async (req,res,next)=>{
  const userid=req.params.id;
  const result=await projectservices.fetchrooms(userid);
  let array=[];
  result.forEach(room=>{
      if (room.roomType=='Interview'){
        array.push(room);
  }
  })
  //fetching user details
  const userdata=await services.userdetails(userid);
  res.render('myrooms',{data:array,userdata:userdata});
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
app.post('/room/:id',async  (req,res,next)=>{
  const roomid=req.params.id;
  const data=req.body;
  console.log('data and roomid is ',data,roomid);
  //fetching user details
  const userdetails=await services.userdetails(data.userid);
  //fetching roomdetails
  const roomdata=await projectservices.findmyroom(roomid);
  console.log("this is the final room data",roomdata);
  res.render('specificroom',{data:roomdata,userdata:userdetails});
});
//delete middleware
app.get('/delete/account/:id',async (req,res,next)=>{
  const userid=req.params.id;
  const result=await services.deleteuser(userid);
  if (result.status==true){
    res.redirect('/');
  }else if (result.status==false){
    res.render('notpossible',{userid:userid});
  }

})
//updating account data
app.post('/update/account/:id',async (req,res,next)=>{
  const userid=req.params.id;
  const data=req.body;
  console.log('update able data is this',data);
  const result=await services.updateuser(userid,data);
  if (result.status==true){
    res.redirect(`/account/setting/${userid}`);
  }else{
    res.status(404).send('Updation failed try again later after some time');
  }
})
//room setting middleware
app.get('/room/setting/:id',async (req,res,next)=>{
  const userid=req.params.id;
  //finding userhosted room
  const result=await projectservices.findmyhostedroom(userid);
  console.log('room data is ',result);
  res.render('editroom',{roomdata:result,userid:userid});
})
//deleting the room
app.post('/delete/room/:id',async (req,res,next)=>{
  const datauserid=req.body;
  const roomid=req.params.id;
  const result=await projectservices.deleteroom(roomid,datauserid);
  if (result.status==true){
    res.redirect(`/room/setting/${result.userid}`);
  }else{
    res.render('nothost',{userid:result.userid});
  }
})
//edit room info middleware
app.get('/edit/room/:id',async (req,res,next)=>{
  const roomid=req.params.id;
  const result=await projectservices.findmyroom(roomid);
  res.render('editroominfo',{roominfo:result});
})
//post update of edit room middleware
app.post('/update-room/:id',async (req,res,next)=>{
  const roomid=req.params.id;
  const data=req.body;
  const result=await projectservices.updateroom(roomid,data);
  console.log(result);
  if (result.status==true){
    res.redirect(`/room/setting/${result.userid}`);
  }else{
    res.status(404).send('Plz Try again later');
  }
})

app.listen(3000,()=>{
  console.log(`Your server is running at http:localhost:3000`);
})

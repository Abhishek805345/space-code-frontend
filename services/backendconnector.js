const { response } = require("express");

exports.sess=async ()=>{
  const responce=await fetch("http://localhost:3001/api/sess",{
     credentials: "include",
  });
  const result=await responce.json();
  return result;
}

exports.login_data=async (data)=>{
  const responce=await fetch("http://localhost:3001/api/save/data",{
    method:"post",
     credentials: "include",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await responce.json();
  return result;
}
exports.logincheck=async (data)=>{
  const responce=await fetch("http://localhost:3001/api/login/check",{
    method:"post",
     credentials: "include",
    headers:{
      "Content-Type":"application/json"
    },
    credentials: "include", 
    body:JSON.stringify(data)
  })
  const result=await responce.json();
  return result;
}
//email check and send otp
exports.sendmail=async(data)=>{
  const responce= await fetch("http://localhost:3001/api/email/send/otp",{
    method:"post",
     credentials: "include",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await responce.json();
  return result;
}
exports.validateotp=async (data,id)=>{
  const responce=await fetch(`http://localhost:3001/api/otp/validate/${id}`,{
    method:"post",
     credentials: "include",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await responce.json();
  return result;
}
//saving the new password
exports.savepass=async (data,id)=>{
  const responce=await fetch(`http://localhost:3001/api/save-password/${id}`,{
     credentials: "include",
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await responce.json();
  return result;
}

//logout
exports.logoutsave=async (id)=>{
  const responce=await fetch(`http://localhost:3001/api/logout/${id}`,{
     credentials: "include",
    method:"get"
  });
  const result=await responce.json();
  return result;
}
//userdetails
exports.userdetails=async (id)=>{
  const responce=await fetch(`http://localhost:3001/api/user/details/${id}`,{
     credentials: "include",
  });
  const result=await responce.json();
  return result;
}

//delete user account
exports.deleteuser=async (userid)=>{
  const response=await fetch(`http://localhost:3001/api/delete/user/${userid}`,{
    method:"delete"
  })
  const result=await response.json();
  return result;
}
//updateing user account 
exports.updateuser=async (userid,data)=>{
  const response=await fetch(`http://localhost:3001/api/update/user/${userid}`,{
    method:'put',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await response.json();
  return result;
}


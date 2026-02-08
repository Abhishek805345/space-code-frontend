exports.sess=async ()=>{
  const responce=await fetch("http://localhost:3001/api/sess");
  const result=await responce.json();
  return result;
}

exports.login_data=async (data)=>{
  const responce=await fetch("http://localhost:3001/api/save/data",{
    method:"post",
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
    method:"get"
  });
  const result=await responce.json();
  return result;
}
//userdetails
exports.userdetails=async (id)=>{
  const responce=await fetch(`http://localhost:3001/api/user/details/${id}`);
  const result=await responce.json();
  return result;
}

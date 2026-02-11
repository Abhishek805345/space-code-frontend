exports.sess=async ()=>{
  const responce=await fetch("https://space-code-backend.onrender.com/api/sess");
  const result=await responce.json();
  return result;
}

exports.login_data=async (data)=>{
  const responce=await fetch("https://space-code-backend.onrender.com/api/save/data",{
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
  const responce=await fetch("https://space-code-backend.onrender.com/api/login/check",{
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
  const responce= await fetch("https://space-code-backend.onrender.com/api/email/send/otp",{
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
  const responce=await fetch(`https://space-code-backend.onrender.com/api/otp/validate/${id}`,{
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
  const responce=await fetch(`https://space-code-backend.onrender.com/api/save-password/${id}`,{
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
  const responce=await fetch(`https://space-code-backend.onrender.com/api/logout/${id}`,{
    method:"get"
  });
  const result=await responce.json();
  return result;
}
//userdetails
exports.userdetails=async (id)=>{
  const responce=await fetch(`https://space-code-backend.onrender.com/api/user/details/${id}`);
  const result=await responce.json();
  return result;
}

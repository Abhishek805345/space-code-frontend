exports.saveroominfo=async (data)=>{
  const responce=await fetch("https://space-code-backend.vercel.app/api/room/info",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await responce.json();
  return result;
}
//fetch rooms
exports.fetchrooms=async (id)=>{
  const responce=await fetch(`https://space-code-backend.vercel.app/api/saved/room/${id}`);
  const result=await responce.json();
  return result;
}
//fetch single room data
exports.findmyroom= async (id)=>{
  const responce=await fetch(`https://space-code-backend.vercel.app/api/myroom/${id}`,{
    method:'get'
  });
  const result=await responce.json();
  return result;
}
//invitation api
exports.inviteuser=async (data)=>{
  const responce =await fetch("https://space-code-backend.vercel.app/api/invite/user",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  });
  const result=await responce.json();
  return result;
}


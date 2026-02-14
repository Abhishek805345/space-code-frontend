exports.saveroominfo=async (data)=>{
  const responce=await fetch("https://space-code-backend.onrender.com/api/room/info",{
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
  const responce=await fetch(`https://space-code-backend.onrender.com/api/saved/room/${id}`,{
  });
  const result=await responce.json();
  return result;
}
//fetch single room data
exports.findmyroom= async (id)=>{
  const responce=await fetch(`https://space-code-backend.onrender.com/api/myroom/${id}`,{
    method:'get',
  });
  const result=await responce.json();
  return result;
}
//invitation api
exports.inviteuser=async (data)=>{
  const responce =await fetch("https://space-code-backend.onrender.com/api/invite/user",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  });
  const result=await responce.json();
  return result;
}
//deleting room
exports.deleteroom=async (roomid,data)=>{
  const response=await fetch(`https://space-code-backend.onrender.com/api/delete/${roomid}`,{
    method:'delete',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await response.json();
  return result;
}
//update room info
exports.updateroom=async (roomid,data)=>{
  const response=await fetch(`https://space-code-backend.onrender.com/api/update/room/${roomid}`,{
    method:'put',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await response.json();
  return result;
}


exports.saveroominfo=async (data)=>{
  const responce=await fetch("http://localhost:3001/api/room/info",{
    method:"post",
    credentials:'include',
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
  const responce=await fetch(`http://localhost:3001/api/saved/room/${id}`,{
    credentials:'include',
  });
  const result=await responce.json();
  return result;
}
//fetch single room data
exports.findmyroom= async (id)=>{
  const responce=await fetch(`http://localhost:3001/api/myroom/${id}`,{
    method:'get',
    credentials:'include'
  });
  const result=await responce.json();
  return result;
}
//invitation api
exports.inviteuser=async (data)=>{
  const responce =await fetch("http://localhost:3001/api/invite/user",{
    method:"post",
    credentials:'include',
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
  const response=await fetch(`http://localhost:3001/api/delete/${roomid}`,{
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
  const response=await fetch(`http://localhost:3001/api/update/room/${roomid}`,{
    method:'put',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  })
  const result=await response.json();
  return result;
}
//find my hosted rooms
exports.findmyhostedroom=async (userid)=>{
  const response=await fetch(`http://localhost:3001/api/hosted/rooms/${userid}`);
  const result=await response.json();
  return result;
}


exports.saveroominfo=async (data)=>{
  const responce=await fetch("http://localhost:3001/api/room/info",{
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
  const responce=await fetch(`http://localhost:3001/api/saved/room/${id}`);
  const result=await responce.json();
  return result;
}
//fetch single room data
exports.findmyroom= async (id)=>{
  const responce=await fetch(`http://localhost:3001/api/myroom/${id}`,{
    method:'get'
  });
  const result=await responce.json();
  return result;
}
//invitation api
exports.inviteuser=async (data)=>{
  const responce =await fetch("http://localhost:3001/api/invite/user",{
    method:"post",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  });
  const result=await responce.json();
  return result;
}

//to save the room code
exports.savecode=async (data)=>{
  const responce=await fetch('vsdva');
}
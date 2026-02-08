const socket = io("http://localhost:3001");

socket.emit("join-room", document.getElementById("roomid").value);
socket.emit("join-coderoom", document.getElementById("codeid").value);

socket.on("receive-message", (data) => {
  const chat = document.getElementById("chat-messages");
  const msg = document.createElement("div");
  msg.className = "chat-message";
  msg.textContent = `${data.message} (${data.time})`;
  chat.appendChild(msg);
});

socket.on("receive-code", ({ message }) => {
  document.getElementById("code").value = message;
});

function send() {
  socket.emit("send-message", {
    roomid: document.getElementById("roomid").value,
    message: document.getElementById("chat").value,
    hostid: document.getElementById("hostid").value
  });
}

function submitcode() {
  socket.emit("send-code", {
    codeid: document.getElementById("codeid").value,
    message: document.getElementById("code").value,
    roomid: document.getElementById("roomid").value       //to save the code to db with roomid
  });
}
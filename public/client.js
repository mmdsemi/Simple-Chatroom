const socket = io();
let names;
const textarea = document.querySelector("#textarea");
const messageare = document.querySelector(".message__area");
do {
  names = prompt("enter Your Name :");
} while (!names);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendmessage(e.target.value);
    e.target.value = "";
  }
});

function sendmessage(message) {
  let msg = {
    username: names,
    message: message.trim(),
  };
  appendmessage(msg, "outgoing");

  // Send To SErver
  socket.emit("message", msg);
}

function appendmessage(msg, type) {
  let MainDiv = document.createElement("div");
  let Classname = type;
  MainDiv.classList.add(type, "message");

  let markup = `
    <h4>${msg.username}</h4>
    <p>${msg.message}</p>
    `;
  MainDiv.innerHTML = markup;
  messageare.appendChild(MainDiv);
}

// Recive Message

socket.on("message", (msg) => {
  appendmessage(msg, "incoming");
});

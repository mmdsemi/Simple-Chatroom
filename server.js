const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3000;
const http = require("http").createServer(app);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname + "/public"));

http.listen(PORT, (err) => {
  if (!err) {
    console.log("Connected To Server");
  }
});

//socket

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("Socket Connected!");

  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
});

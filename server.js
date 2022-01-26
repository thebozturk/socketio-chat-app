const express = require("express");
const socket = require("socket.io");
const app = express();

app.use(express.static("public"));

const server = app.listen(4000, () => {
  console.log("server is running on port 4000");
});

// setup socket
const io = socket(server);
io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", (data) => {
    socket.emit("typing", data);
  });
});

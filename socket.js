let socket_io = require("socket.io");
let io = socket_io();
let socketApi = {};

io.on("connection", (socket) => {
  io.to(socket.id).emit("image", { html: "hello" });
  socket.on("request_data", (data) => {
    console.log(data);
    io.to(socket.id).emit("image", { html: "got it" });
  });
});

socketApi.io = io;
module.exports = socketApi;

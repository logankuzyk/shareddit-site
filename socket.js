const socket_io = require("socket.io");
const io = socket_io();
const rp = require("request-promise");
const handlebars = require("handlebars");
const fs = require("fs");

let socketApi = {};

io.on("connection", async (socket) => {
  socket.on("request_data", async (data) => {
    if (data.toLowerCase().indexOf("comments") > 0) {
      console.log(socket.id);
      io.to(socket.id).emit("image", {
        html: fs.readFileSync(__dirname + "/views/site/spinner.html", "utf8"),
      });
      let body = await handlebars.compile(
        fs.readFileSync(__dirname + "/views/site/generated.hbs", "utf8")
      );
      await rp(process.env.BACKEND_URL + data).then((response) => {
        //send image url to client
        response = JSON.parse(response);
        body = body({ link: response.image });
      });
      io.to(socket.id).emit("image", { html: body });
    }
  });
});

socketApi.io = io;
module.exports = socketApi;

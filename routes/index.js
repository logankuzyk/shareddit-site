const express = require("express");
const router = express.Router();
const fs = require("fs");
const dotenv = require("dotenv").config();
const rp = require("request-promise");

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("site/index", {
    title: "shareddit: share reddit posts with images",
    info: fs.readFileSync(__dirname + "/../views/site/info.hbs"),
  });
});

// router.get("/image/:ID", async (req, res, next) => {
//   let image = null;
//   let body = await handlebars.compile(
//     fs.readFileSync(__dirname + "/../views/site/generated.hbs", "utf8")
//   );
//   body = await body({ link: data.url });
//   await rp(process.env.BACKEND_URL + req.originalUrl).then((response) => {
//     console.log(response);
//     image = response.image;
//     console.log("received " + image);
//   });
//   res.render("site/index", async () => {
//     title: "shareddit: generated image";
//     link: image;
//   });
// });

router.get(
  "/r/:sub/comments/:postID/:title?/:commentID?",
  async (req, res, next) => {
    res.render("site/index", {
      title: "shareddit: generating image",
      status: "generating...",
    });
    let id = null;
    let image = null;
    if (req.params.commentID) {
      id = req.params.commentID;
    } else {
      id = req.params.postID;
    }
    console.log(req.originalUrl);
    const io = req.app.get("socketio");
    await rp(process.env.BACKEND_URL + req.originalUrl).then((response) => {
      //send image url to client
      image = response.image;
      image = "<img src='" + image + "'/>";
      console.log("received " + image);
      io.to(req.cookies.io).emit("image", { html: image });
    });
  }
);

module.exports = router;

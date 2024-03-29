const express = require("express");
const router = express.Router();
const fs = require("fs");
const dotenv = require("dotenv").config();
const rp = require("request-promise");
const path = require("path");

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("site/index", {
    title: "shareddit: share reddit posts with images",
    info: fs.readFileSync(__dirname + "/../views/site/info.hbs"),
    body: fs.readFileSync(__dirname + "/../views/site/landing.hbs"),
  });
});

router.get("/ads.txt", async (req, res, next) => {
  res.sendFile(path.resolve(__dirname + "/../ads.txt"));
});

router.get("/r/:sub/comments/:postID/:title", async (req, res, next) => {
  res.render("site/index", {
    title: "shareddit: share reddit posts with images",
    info: fs.readFileSync(__dirname + "/../views/site/info.hbs"),
  });
});

router.get("/r/:sub/comments/:postID/:title/redact", async (req, res, next) => {
  res.render("site/index", {
    title: "shareddit: share reddit posts with images",
    info: fs.readFileSync(__dirname + "/../views/site/info.hbs"),
  });
});

router.get(
  "/r/:sub/comments/:postID/:title/:commentID",
  async (req, res, next) => {
    res.render("site/index", {
      title: "shareddit: share reddit posts with images",
      info: fs.readFileSync(__dirname + "/../views/site/info.hbs"),
    });
  }
);

router.get(
  "/r/:sub/comments/:postID/:title/:commentID/redact",
  async (req, res, next) => {
    res.render("site/index", {
      title: "shareddit: share reddit posts with images",
      info: fs.readFileSync(__dirname + "/../views/site/info.hbs"),
    });
  }
);

module.exports = router;

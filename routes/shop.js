const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});
//Replacing ( __dirname,"../" ) with rootDir.
//It's nothing but the path that we exported from utils folder.

module.exports = router;

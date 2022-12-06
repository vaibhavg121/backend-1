//Using helper function to better define the relative path within the directory :

//Copy-pasting updated files.

// Creating the helper fn :
// util/path.js =>

const path = require("path");

module.exports = path.dirname(require.main.filename);

//////////////////////////////////////////////////////////////////////////////////////////////////////

// /routes/admin.js =>
const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});
//Replacing ( __dirname,"../" ) with rootDir.
//It's nothing but the path that we exported from utils folder.

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// /routes/shop.js =>
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

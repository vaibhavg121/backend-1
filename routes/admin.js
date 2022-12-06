const path = require("path");

const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});
//Using the path.join() method to construct our actual relative path in the directory.

//"__dirname" is a global variable which holds the absoulute path of current directory on our OS.

//"../" means go one level above bcz the __dirname will give the path of "routes" folder which is current folder.
//While we are required the "views" folder which is it's sibling folder

router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;

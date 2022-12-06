const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

const products = [];

router.get("/add-product", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});
//The same {title: inputDataFromForm} data is being pushed to the products array
//Which we were just console.logging previously.

exports.routes = router;
exports.products = products;
//Named exports with dot notation to be used as a part of object later

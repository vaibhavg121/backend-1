const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  const products = adminData.products;
  res.render("shop", { prods: products, docTitle: "Shop" });
  //This is how we pass data to the template engine to be rendered dynamically
  //Now this products data is available in the shop.pug file as prods.
  //This is the standard syntax - In key-value pairs, thats how we pass the data to the template engine
});

module.exports = router;

//Separating controllers logic into separate folder named controllers following the MVC structure.

//Just Copy-pasting the updated files here.

// controllers/products.js =>
const products = [];
exports.getAddProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};

////////////////////////////////////////////////////////////////////////////////////////////////

// controllers/error.js =>
exports.get404 = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
};

///////////////////////////////////////////////////////////////////////////////////////////////////

// routes/admin.js =>
const path = require("path");

const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

//Inside productsController -> Everything from that products.js file is imported.
// That's why we need to specifically use the dot notation to tell which function to exactly use here like in the below line
router.get("/add-product", productsController.getAddProduct);

router.post("/add-product", productsController.postAddProduct);

module.exports = router;

/////////////////////////////////////////////////////////////////////////////////////////////////////////

// routes/shop.js =>
const path = require("path");

const express = require("express");

const productsController = require("../controllers/products");
const { AsyncLocalStorage } = require("async_hooks");

const router = express.Router();

router.get("/", productsController.getProducts);

module.exports = router;

/////////////////////////////////////////////////////////////////////////////////////

//Also, few other minor updates in the app.js as well.

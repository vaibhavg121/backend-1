//Creating Models to separate data from logic.

//Step-by-step commits to understand it better.

//Small initial commit.

// Updated files =>

// models/product.js =>
const products = [];

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    products.push(this);
  }

  static fetchAll() {
    return products;
  }
};

////////////////////////////////////////////////////////////////////////////////////////////

// controllers/products.js =>
const Product = require("../models/product");

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
  //removed products.push from here, bcz we are now creating separate model for it
  //And now creating an instance of that imported class :-
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  //Importing that static method from the class again to fetch products:-
  const products = Product.fetchAll();

  res.render("shop", {
    prods: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};

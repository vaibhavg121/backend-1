const path = require("path");

const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

//Inside productsController -> Everything from that products.js file is imported.
// That's why we need to specifically use the dot notation to tell which function to exactly use here like in the below line
router.get("/add-product", productsController.getAddProduct);

router.post("/add-product", productsController.postAddProduct);

module.exports = router;

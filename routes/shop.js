const path = require("path");

const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

//Same as did in admin.js :-
router.get("/", productsController.getProducts);

module.exports = router;

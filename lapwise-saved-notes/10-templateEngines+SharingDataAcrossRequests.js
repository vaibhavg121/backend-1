// Template engines start & sharing data across requests/users

const { application } = require("express");

// A lot of modified files.
// Multiple files are modified and hence only putting important modifications here.

// app.js =>
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set("view engine", "pug");
app.set("views", "views");
//app.set(name, value) -> This is the default syntax of app.set()
//This method sets a "setting-name" to a "value"

const adminData = require("./routes/admin");

const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.routes);
//As it was object-dot exports in admin.js, we need to use the dot notation here as well
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//shop.pug =>
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(name="viewport", content="width=device-width, initial-scale=1.0")
        meta(http-equiv="X-UA-Compatible", content="ie=edge")
        title My Shop
        link(rel="stylesheet", href="/css/main.css")
        link(rel="stylesheet", href="/css/product.css")
    body
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a.active(href="/") Shop
                    li.main-header__item
                        a(href="/admin/add-product") Add Product

////////////////////////////////////////////////////////////////////////////////////////////////////////

//admin.js =>
//named exports (object dot notation) =>

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

////////////////////////////////////////////////////////////////////////////////////////////////

//shop.js =>
//rendering pug file
const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("shop");
});

module.exports = router;

//////////////////////////////////////////////////////////////////////////////////////////////////


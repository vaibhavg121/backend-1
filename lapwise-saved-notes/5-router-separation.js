//Router-Separation

//3-separate files - Just copy-pasted together for reference :-

//app.js ===>
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const adminRoutes = require("./routes/admin");
//Importing the whole "router" object that is exported from this file.
//This router-object has all the necessary routes registered.
//And - This adminRoutes is a valid Middleware fn. So, to use those all the routes here -
//We simple have to use this middleware in app.use() and it gets working.

const shopRoutes = require("./routes/shop");
//Same as above

app.use(bodyParser.urlencoded({ extended: false }));

//This line means-Importing all the http-requests code from that admin.js here
//And then using that whole imported module as a middleware fn here.
app.use(adminRoutes);

//Same as above explanation
app.use(shopRoutes);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//routes/admin.js ===>
const express = require("express");
const router = express.Router();
//This Router is like a mini-express app tied to other express apps / Pluggable to other express apps,
//Which can be exported from here to be used in other places.

//*** Copy-Paste the below code from app.js & SIMPLY REPLACE "app" with "router" :-
/*
app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});
app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});
*/

router.get("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
//Now this will be imported into the app.js

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//routes/shop.js ===>
const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("<h1>Root route</h1>");
});

module.exports = router;

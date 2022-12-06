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

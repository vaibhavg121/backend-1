//Routes-Order MATTERS a lot.

const express = require("express");
const app = express();

app.use("/", (req, res, next) => {
  console.log("This always runs");
  next();
});

//Order of defining routes matters a lot.
//More specific routes like this add-product must always be above the more generic routes like root-route below.
app.use("/add-product", (req, res, next) => {
  console.log("Add Product console log");
  res.send("<h1>Add Product</h1>");
});

//As we send a response above in add-product, Thiss response wont be sent.
//But if we write this below-wala block of code above add-product; It will never reach that add-product code &
//& a response will be returned from this root-route only.
app.use("/", (req, res, next) => {
  console.log("Root console log");
  res.send("<h1>Root route</h1>");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

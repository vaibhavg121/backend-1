const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

//Now all the routes inside aminRoutes will implement after "/admin" only
//Bcz we are explicitely specifying it to use it next to "/admin/------"
app.use("/admin", adminRoutes);
app.use(shopRoutes);

//Showing error for invalid routes:
app.use((req, res, next) => {
  res.status(404).send("<h1>Page Not Found</h1>");
});
//As this is used without route & "AT THE END" - Any invalid path will show this error.

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

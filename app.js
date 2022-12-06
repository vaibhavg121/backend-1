//Router-Separation commit

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

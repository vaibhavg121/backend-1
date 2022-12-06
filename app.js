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

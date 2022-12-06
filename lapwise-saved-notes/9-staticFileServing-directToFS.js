//Serving static files.
//i.e. these files are not handled by express or other middlewares
//But they are directly forwarded by the fs-module of node.

// *** Using express.static() middleware to serve css files

//Copy-pasting only app.js + Addition of CSS files in public folder + adding classes to HTML files.

//Serving static files with express.static

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const adminRoutes = require("./routes/admin");

const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
//in-built middleware provided by express to serve static files.
//We just need to provide the directory name.
//It only provides Reading access.

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

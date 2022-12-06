//bodyparser to read POST data.

const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

//A simple form which will return an object onto ur console.log as {title: dataPassed}.
app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});
//As seen from the returned <form /> in the res; we can clearly see that -
//The http-method is set to POST & the action takes place at route - "/product"

//Whats happening here is ->
//1-The above <form /> when submitted - MAKES A POST REQUEST AT ROUTE-"/product"
//2-Now, we'll read the data inside the body of that post request below :-

app.post("/product", (req, res, next) => {
  console.log(req.body); //Reading data in the above post-request.
  //Note-req.body can't directly parse the the data. Read the note at the end.
  res.redirect("/"); //Method that redirects us to the root route after the above console.log is done.
});

app.use("/", (req, res, next) => {
  res.send("<h1>Root route</h1>");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

//Parser-Note:
//req.body will give undefined bcz it can't parse that data by default.
//For parsing that data, we have to use the body-parser middleware which has to be installed as a dependency.
//Only after implementing that middleware at the top level for all the requests, using app.use(),
//Then only we can parse the data inside req.body and thus get the data in the console that we sent from the <form />

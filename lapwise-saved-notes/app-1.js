//app.use() & next:-

const express = require("express");
const app = express();

//app.use() =>
//use method allows us to add new middleware functions.
//Also, use method is ran for every single incoming request.
//use takes in a function as an argument & that function itself has three arguments.
// => req,res & next

//As we already knowm req & res are HTTP-request & HTTP-response objects.
//But what is next?
// => next is actually a function. A funtion inside the whole outer function.
// What does it do?
// => It tells the app to run the next middleware function - sequentially.
//Without next(); we can see the refresh loader get stuck in the browser bcz....
//bcz - The control is not passed to the next line of code / middlewares.

app.use((req, res, next) => {
  console.log("In the first middleware");
  next();
  //Without this next - The console never logs "In the second middleware"
  //And also gets stuck at loader after console.logging "In the first middleware"
});

//After above first next(); the control is passed to the following second middleware, but it again gets stuck after printing "In the second middleware"

app.use((req, res, next) => {
  console.log("In the second middleware");
  next();
  //Without this second next() =>We can see both the console.logs but the loader gets stuck again.
  //Only after this second next() => the res-res cycle is completed & we can finally see that default - "Cannot GET /" on the screen with no stuck loader
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

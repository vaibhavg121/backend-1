//res.send() - Internal Working :-

const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("In the first middleware");
  next();
});

app.use((req, res, next) => {
  console.log("In the second middleware");
  res.send("<h1>Hello from Middleware</h1>");
  //Like this, u can directly send HTML too as a response.
  //Sending response is the last step in the req-res cycle.
  //Hence u r not required to have next() here bcz sending the response ultimately completes the cycle.
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

//NOTES: -
//Just read & try to understand :-

//How res.send() is defined internally in express ? ===>
res.send = function send(body) {
  var chunk = body;
  var encoding;
  var req = this.req;
  var type;

  // settings
  var app = this.app;

  // allow status / body
  if (arguments.length === 2) {
    // res.send(body, status) backwards compat
    if (typeof arguments[0] !== "number" && typeof arguments[1] === "number") {
      deprecate(
        "res.send(body, status): Use res.status(status).send(body) instead"
      );
      this.statusCode = arguments[1];
    } else {
      deprecate(
        "res.send(status, body): Use res.status(status).send(body) instead"
      );
      this.statusCode = arguments[0];
      chunk = arguments[1];
    }
  }

  // disambiguate res.send(status) and res.send(status, num)
  if (typeof chunk === "number" && arguments.length === 1) {
    // res.send(status) will set status message as text string
    if (!this.get("Content-Type")) {
      this.type("txt");
    }

    deprecate("res.send(status): Use res.sendStatus(status) instead");
    this.statusCode = chunk;
    chunk = statuses.message[chunk];
  }

  switch (typeof chunk) {
    // string defaulting to html
    case "string":
      if (!this.get("Content-Type")) {
        this.type("html");
      }
      break;
    case "boolean":
    case "number":
    case "object":
      if (chunk === null) {
        chunk = "";
      } else if (Buffer.isBuffer(chunk)) {
        if (!this.get("Content-Type")) {
          this.type("bin");
        }
      } else {
        return this.json(chunk);
      }
      break;
  }

  // write strings in utf-8
  if (typeof chunk === "string") {
    encoding = "utf8";
    type = this.get("Content-Type");

    // reflect this in content-type
    if (typeof type === "string") {
      this.set("Content-Type", setCharset(type, "utf-8"));
    }
  }

  // determine if ETag should be generated
  var etagFn = app.get("etag fn");
  var generateETag = !this.get("ETag") && typeof etagFn === "function";

  // populate Content-Length
  var len;
  if (chunk !== undefined) {
    if (Buffer.isBuffer(chunk)) {
      // get length of Buffer
      len = chunk.length;
    } else if (!generateETag && chunk.length < 1000) {
      // just calculate length when no ETag + small chunk
      len = Buffer.byteLength(chunk, encoding);
    } else {
      // convert chunk to Buffer and calculate
      chunk = Buffer.from(chunk, encoding);
      encoding = undefined;
      len = chunk.length;
    }

    this.set("Content-Length", len);
  }

  // populate ETag
  var etag;
  if (generateETag && len !== undefined) {
    if ((etag = etagFn(chunk, encoding))) {
      this.set("ETag", etag);
    }
  }

  // freshness
  if (req.fresh) this.statusCode = 304;

  // strip irrelevant headers
  if (204 === this.statusCode || 304 === this.statusCode) {
    this.removeHeader("Content-Type");
    this.removeHeader("Content-Length");
    this.removeHeader("Transfer-Encoding");
    chunk = "";
  }

  // alter headers for 205
  if (this.statusCode === 205) {
    this.set("Content-Length", "0");
    this.removeHeader("Transfer-Encoding");
    chunk = "";
  }

  if (req.method === "HEAD") {
    // skip body for HEAD
    this.end();
  } else {
    // respond
    this.end(chunk, encoding);
  }

  return this;
};

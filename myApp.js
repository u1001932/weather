
var express = require('express');
var app = express();

// --> 7)  Mount the Logger middleware here


// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */

console.log("Hello World!");
/** 2) A first working Express Server */

//app.get("/", function(req, res) {res.send("Hello Express")}); 
/** 3) Serve an HTML file */

//app.get("/", (req, res)=> {res.sendFile(__dirname + "/views/index.html")})
/** 4) Serve static (public) assets  */

app.use(express.static(__dirname + "/public"))
/** 5) serve JSON on a specific route */

//app.get("/json", (req, res)=> {res.json({"message": "Hello json"})})
/** 6) Use the .env file to configure the app */

process.env.MESSAGE_STYLE="uppercase" //env is shell file, don't leave space around =
app.get("/json", (req, res, next) => { //second, third, fourth... arguments of routing function app.METHOD() is/are middleware function(s), which has the form function(req, res, next)
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE=="uppercase") {
    message = message.toUpperCase();
  }
  res.json({"message": message});
  next();
})
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

app.use( function(req, res, next) { //at root level ("/"), first argument of app.use/app.METHOD routing function can be omitted
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();})

/** 8) Chaining middleware. A Time server */
app.get("/now", function(req, res, next){req.time = (new Date()).toString(); next();}, function(req, res){res.json({"time": req.time});})

/** 9)  Get input from client - Route parameters */
app.get("/:someWord/echo", function(req, res, next){res.json({"echo": req.params.someWord})})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", function(req, res, next){res.json({"name": `${req.query.first} ${req.query.last}`})})
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

var bodyParser = require("body-parser");
var urlParser = bodyParser.urlencoded({extended: false}) //returns a middleware function that handles url-encoded data
/** 12) Get data form POST  */
app.use(urlParser);
app.post("/name", function(req, res, next){res.json({"name": `${req.body.first} ${req.body.last}`})})


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;

const express = require("express");
const session = require('express-session');

var db = require("./db")


// setup the app object
const app = express();
const PORT = 3006


//global variables
let clickCount = 0;


// Parse URL-encoded bodies requires express 4.16+
// (older versions of express had external libraries for this)
app.use(express.urlencoded({extended:true})); 
app.use(session({secret:"oauhsdlmfnaliustydfialjbkwegf"}))

app.set("views", "templates");
app.set("view engine", "pug");

app.use('/resources', express.static('resources'));

app.get("/", function(req, res) {
    res.render("todo.pug");
});

app.get("/todo", function(req, res) {
    res.render("todo.pug");
});

app.post("/", function(req, res) {
    const title = req.body.title
    console.log(title)
    res.render("todo.pug");
});



// Start the web server
app.listen(PORT, function() {
   console.log(`Listening on http://localhost:${PORT}`);
});
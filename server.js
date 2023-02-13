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
app.use(express.json())

app.set("views", "templates");
app.set("view engine", "pug");

app.use('/resources', express.static('resources'));

app.get("/", function(req, res) {
    res.redirect("/todo");
});

app.get("/todo", async function(req, res) {
    todoList = await db.getTodo();
    for(let i = 0; i < todoList.length; i++){
        todoList[i].todo_date = todoList[i].todo_date.toDateString();
    }
    res.render("todo.pug", {list: todoList});
});

app.get("/inProgress", async function(req, res) {
    todoList = await db.filterTodo("inProgress");
    for(let i = 0; i < todoList.length; i++){
        todoList[i].todo_date = todoList[i].todo_date.toDateString();
    }
    res.render("inProgress.pug", {list: todoList});
});

app.get("/complete", async function(req, res) {
    todoList = await db.filterTodo("Complete");
    for(let i = 0; i < todoList.length; i++){
        todoList[i].todo_date = todoList[i].todo_date.toDateString();
    }
    res.render("complete.pug", {list: todoList});
});

app.post("/todo", async function(req, res) {
    const title = req.body.title || " ";
    const desc = req.body.description || " ";
    const date = req.body.dueDate || new Date();
    await db.addTodo(title, desc, date)
    res.redirect("/todo")
});

app.post("/deleteTodo", async function(req, res) {
    await db.deleteTodo(req.body.buttonId);
    res.redirect("/todo")
});

app.post("/deleteInProgress", async function(req, res) {
    await db.deleteTodo(req.body.buttonId);
    res.redirect("/inProgress")
});

app.post("/deleteComplete", async function(req, res) {
    await db.deleteTodo(req.body.buttonId);
    res.redirect("/complete")
});

app.post("/setComplete", async function(req, res) {
    await db.changeStatus(req.body.id, 1);
    return res.json()
});

app.post("/setIncomplete", async function(req, res) {
    await db.changeStatus(req.body.id, 0);
    return res.json()
});

app.post("/search", async function(req, res) {
    todoList = await db.searchTodo(req.body.search);
    for(let i = 0; i < todoList.length; i++){
        todoList[i].todo_date = todoList[i].todo_date.toDateString();
    }
    res.render("todo.pug", {list: todoList});
});





// Start the web server
app.listen(PORT, function() {
   console.log(`Listening on http://localhost:${PORT}`);
});
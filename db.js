var mysql = require("mysql");

var connPool = mysql.createPool({
  connectionLimit: 5,
  host: "cse-mysql-classes-01.cse.umn.edu",
  user: "C4131F22U127",
  database: "C4131F22U127",
  password: "16179"
});


function getTodo() {
  return new Promise((resolve, reject) => {
    connPool.query("select * from todo", (err, rows) => {
      if(err){
        reject(err);
      }
      else{
        resolve(rows);
      }
    })
  })
}

exports.getTodo = getTodo;

function addTodo(title, description, date) {
  return new Promise((resolve, reject) => {
        const SQL = 'INSERT INTO todo (todo_name, todo_description, is_resolved, todo_date) VALUES (?, ?, ?, ?)';
        connPool.query(SQL, [title, description, 0, date], (err, rows) => {
        if(err){
            reject(err);
        }
        else{
            resolve(rows);
        }

      });
  });
}

exports.addTodo = addTodo;


function deleteTodo(id) {
  return new Promise((resolve, reject) => {
        const SQL = 'DELETE FROM todo WHERE todo_id = ?';
        connPool.query(SQL, [id], (err, rows) => {
        if(err){
            reject(err);
        }
        else{
            resolve(rows);
        }
      });
  });
}

exports.deleteTodo = deleteTodo;


function changeStatus(id, status) {
  return new Promise((resolve, reject) => {
        const SQL = 'UPDATE todo SET is_resolved = ? WHERE todo_id = ?';
        connPool.query(SQL, [status, id], (err, rows) => {
        if(err){
            reject(err);
        }
        else{
            resolve(rows);
        }
      });
  });
}

exports.changeStatus = changeStatus;

function searchTodo(searchStr) {
  return new Promise((resolve, reject) => {
        searchStr = "%" + searchStr + "%"
        const SQL = "SELECT * FROM todo WHERE todo_name LIKE ? OR todo_description LIKE ?";
        connPool.query(SQL, [searchStr, searchStr], (err, rows) => {
        if(err){
            reject(err);
        }
        else{
            resolve(rows);
        }
      });
  });
}

exports.searchTodo = searchTodo;

function filterTodo(filter) {
  return new Promise((resolve, reject) => {
    if (filter == "Complete"){
      SQL = "SELECT * FROM todo WHERE is_resolved = 1"
    }
    else{
      SQL = "SELECT * FROM todo WHERE is_resolved = 0"
    }
    connPool.query(SQL, (err, rows) => {
      if(err){
        reject(err);
      }
      else{
        resolve(rows);
      }
    })
  })
}

exports.filterTodo = filterTodo;
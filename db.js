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

function addContact(title, email, username, category, message, link) {
  return new Promise((resolve, reject) => {
    if(link == 'undefined'){
        const SQL = `insert into colors (title, email, username, category, message) values (?, ?, ?, ?, ?, ?)`;
        connPool.query(SQL, [title, email, username, category, message], (err, rows) => {
        if(err){
            reject(err);
        }
        else{
            resolve(rows);
        }
        })
    }
    else{
        const SQL = `insert into colors (title, email, username, category, message, link) values (?, ?, ?, ?, ?, ?)`;
        connPool.query(SQL, [title, email, username, category, message, link], (err, rows) => {
        if(err){
            reject(err);
        }
        else{
            resolve(rows);
        }
    });
    }
  })
}

exports.addContact = addContact;
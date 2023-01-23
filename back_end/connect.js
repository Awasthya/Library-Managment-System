
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: 8080,
    database:'librarymanagementsystem',
    password: ''
})
db.connect((err) =>{
    if (err)
        console.log(err);
    console.log('MySql Connect....');
})

module.exports = db;
require('localenv');

const express = require('express');
const mysql = require('mysql');

// Create connection. All the values are taken from environment variables
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.PORT,
  database: process.env.MYSQL_DATABASE
});

// Connect
db.connect((err) => {
  if(err){
    throw err;
  }
  console.log('MySql Connected...');
});

const app = express();

// Insert record
app.get('/', (req, res) => {
  sql = 'INSERT INTO visit SET ?';
  post = {datetime: new Date(new Date().toUTCString()) };
  db.query(sql, post, (err, result) => {
    if(err) throw err;
    console.log(result.insertId);
    res.send('Your visit number: ' + result.insertId);
  });
});

// Start the server
app.listen('8080', () => {
  console.log('Server started on port 8080');
  // Create table if not exists
  sql = 'CREATE TABLE IF NOT EXISTS visit (hits INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, datetime DATETIME NOT NULL)';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
  });
});

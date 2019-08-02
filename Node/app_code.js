require('localenv');

const express = require('express');
const mysql = require('mysql');

// Create connection. All the values are taken from environment variables
const db = mysql.createConnection({
  host: '192.168.30.160',
  user: 'user',
  password: 'password',
  port: 30006,
  database: 'mysqlnodedb'
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

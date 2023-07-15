const mysql = require('mysql2');

const db_Connect = mysql.createPool({
    port: process.env.DB_port,
    host: process.env.DB_host,
    user: process.env.DB_user,
    database: process.env.DB_database,
    password: process.env.DB_password,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // const db_Connect = mysql.createPool({
  //   port: process.env.DB_port,
  //   host: process.env.DB_host,
  //   user: process.env.DB_user,
  //   database: process.env.DB_database,
  //   password: process.env.DB_password,
  //   waitForConnections: true,
  //   connectionLimit: 10,
  //   queueLimit: 0
  // });

  module.exports = db_Connect
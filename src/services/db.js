require('dotenv').config(); //read .env file and set environment variables

const mysql = require('mysql2');

const setting = {
    connectionLimit : 10, //set limit to 10 connection
    host     : process.env.DB_HOST, 
    user     : process.env.DB_USER, 
    password : process.env.DB_PASSWORD, 
    database : process.env.DB_DATABASE,
    multipleStatements: true,
    dateStrings: true 
}

const pool = mysql.createPool(setting);

module.exports = pool;
const db = require('../models/db');

/* 
object of query strings to access for SQL CRUD functionality
used variables so that when we create the controller funcs, we can
pass in args to populate the values

controller funcs will also go in this file
*/

const queryStrings = {
    insertUser: `INSERT INTO Users(email, hash, name)
      VALUES(${email}, ${hash}, ${name})`, 
    selectUser: `SELECT * FROM Users WHERE email = ${email}`, 
    updateUser: `UPDATE Users set ${column} = ${newValue} where id = ${id}`,
    deleteUser: `DELETE FROM Users WHERE id = ${id}`
};

const dbController = {};



module.exports = dbController;

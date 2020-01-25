const express = require('express');
const path = require('path');
const db = require('./models/db')
const userTable = require('./models/userModel');


const app = express();
//parse incoming json
app.use(express.json());

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

//create userTable when server starts up if it doesn't yet exist 
db.query(userTable, (err, res) => {
  if (err) {
    console.log(err);
  }
})

app.listen(3000, () => {
  console.log('Port listening on 3000');
});

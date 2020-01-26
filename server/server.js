const express = require('express');
const path = require('path');
const db = require('./models/db')
const userTable = require('./models/userModel');


const app = express();
//parse incoming json
app.use(express.json());


//create userTable when server starts up if it doesn't yet exist 
db.query(userTable, (err, res) => {
  if (err) {
    console.log(err);
  }
})

app.use((req, res, next) => {
  console.log(`
    ********* FLOW TEST **********
    MEDTHOD: ${req.method}
    URL: ${req.url}
    BODY: ${JSON.stringify(req.body)}
  `)
  return next();
});

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(3000, () => {
  console.log('server listening on 3000');
});

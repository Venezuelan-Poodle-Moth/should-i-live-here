const express = require('express');
const path = require('path');

const app = express();

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.listen(3000, () => {
  console.log('Port listening on 3000');
});

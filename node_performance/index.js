const express = require('express');
const app = express();
const crypto = require('crypto');
const cluster = require('cluster');

app.get('/', (req, res) => {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    res.send('Hi There!');
  });
});
app.get('/fast', (req, res) => {
  res.send('that was fast');
});

app.listen(3000);

// Show the pm2 tool.
// PM2 start index.js -i 0 ----> PM2 will decide how many instances of the node app should be running
// logical cores are those who relevant - being calculated by - physical cores X num of threads per core = logical cores // I have 11 haha yoho
// show the pm2 monit window

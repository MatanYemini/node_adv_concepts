const express = require('express');
const app = express();

// Set CPU power so the requests will be handled slowly
// When this code runs it cant do anything more (eventloop, our code section)
// This is why we need to pay extra attention when adding while loops to our node code (can stuck the eventloop)
function doWork(duration) {
  const start = Date.now();
  while (Date.now - start < duration) {}
}

app.get('/', (req, res) => {
  doWork(5000);
  res.send('Hi There');
});

app.listen(3000);

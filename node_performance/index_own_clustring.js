const express = require('express');
const app = express();

// Now clustring
const cluster = require('cluster');

// Check if the instance is the master (master mode)
if (cluster.isMaster) {
  // We dont want our master to run the code and treat req -> he should be the cluster manager
  console.log(`Hi I am the master! : `, process.pid);
  // Now fork it to another instance
  cluster.fork(); // Cause index.js to be executed *again!* but in child mode
  cluster.fork();
  // Im not the master
} else {
  // Im a Server that is the only thing I will do..
  console.log(`Hi I am the child! : `, process.pid);
  function doWork(duration) {
    const start = Date.now();
    while (Date.now - start < duration) {}
  }

  app.get('/', (req, res) => {
    doWork(5000);
    res.send('Hi There');
  });
  app.get('/fast', (req, res) => {
    res.send('that was fast');
  });

  app.listen(3000);
}

// Now try to run both localhost:3000/ and localhost:3000/fast
// Pay attention that fast will happened!!!!
// Now try with only 1 fork -> it will time (5 sec for the doWork and then it will be for the fast)

// Looks good -> but clustering can cause dinishing performance or even server fail.
// Show the pm2 tool.

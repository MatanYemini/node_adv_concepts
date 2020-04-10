// Fetch google homepage and clac how much time it took

const https = require('https');

const start = Date.now();

function doReq() {
  https
    .request('https://www.google.com', (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log(Date.now() - start);
      });
    })
    .end();
}

// Here as opposed to the threads.js all three are finishing in the same time
doReq();
doReq();
doReq();

// Here we are using diffent thing! remember I have said that node.js
// utilize the async functions that are handled by the OS (this is why node has become possible solution)
// JS Code -> https (node module) -> V8 <- Node's C++ (libuv part) <- OS Async Helpers
// This is why low level functions as http requests are able to be happened concurrently
// Those tasks are being pended into our 'pendingOSTasks' in the 'Threads.js' file. (app.listen someone? YOHO)

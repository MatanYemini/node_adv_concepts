const https = require('https');
const crypto = require('crypto');
const fs = require('fs');
const start = Date.now();

function doReq() {
  https
    .request('https://www.google.com', (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log('Req: ', Date.now() - start);
      });
    })
    .end();
}

function doHash() {
  crypto.pbkdf2('a', 'b', 200000, 512, 'sha512', () => {
    // Invokes when the pbkdf finishes
    console.log('Hash:', Date.now() - start);
  });
}

doReq();

fs.readFile('MultiTask.js', 'utf8', () => {
  console.log('FS: ', Date.now() - start);
});

doHash();
doHash();
doHash();
doHash();

// Run the program and see what is happending

// Now explain:
// ------------
// ThreadPool and OS are divided (ThreadPool for modules like 'fs', OS for 'HTTP')
// Now, The OS is seperated from the ThreadPool so, the HTTP call will be first.
// in the fs example, node creates two distinctive calls to the operating system
// (Access file for stats, and then concating streamed back to the app)// call -> stats -> HD accessed -> node req -> HD accessed -> return file
// Then, The other functions will be called according to the ThreadPool.

// So, the http skips the other requests because it is different.
// The process exaplined:
// ----------------------
// 1. The process for the HTTPS is first since OS is not like the ThreadPool
// Lets say for the example that our ThreadPool can hold 4 threads.(t1, t2, t3, t4)
// 2. t1 = FS, t2 = hash, t3 = hash, t4 = hash; (the hash(n.5) is waiting)
// 3. t1 ---> turns to the Hard Drive (so, t1 is now empty, waiting to response from hard drive)
// 4. t1 ---> says he is empty (since his request is in the HD) so, t1 = hash(n.5)
// 5. t2/t3/t4 ---> finishes. so, the answer from the HD (for FS request) is going to t2/t3/t4
// Remember FS req is faster then hash.
// This is why the order is : 1.HTTPS(OS), 2.Hash(ThreadPool, not the one that started with FS), 3.FS(instead of one Hash request that finished)
//                            4. Hash(TP), 5.Hash(TP)

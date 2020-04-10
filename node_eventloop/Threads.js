// > Node EventLoop           ---------> Single Threaded
// > Node's framework/std lib ---------> Not Single Threaded

// going to benchmark functions
const crypto = require('crypto');

// We also can manipulate the 'Threadpool' that our core is using ---- explanination #2
process.env.UV_THREADPOOL_SIZE = 2;

const start = Date.now();
// The third argument represent number of iterations to the encryption
crypto.pbkdf2('a', 'b', 200000, 512, 'sha512', () => {
  // Invokes when the pbkdf finishes
  console.log('1:', Date.now() - start);
});
// This was the benchmark

// Now see it is not 'single threaded' as at seems to be.... :)
crypto.pbkdf2('a', 'b', 200000, 512, 'sha512', () => {
  // Invokes when the pbkdf finishes
  console.log('2:', Date.now() - start);
}); // Amazing!! YOHO

// Example for event loop (life cycle)
// Starting Node Application....

// 3 arrays for the checking each tick
const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// New timers, taskes, operation are recorded from myFile running
myFile.runContents(); // happpends before the event loop

function shouldContinue() {
  // 3 Checks:
  //------------
  //  1. Any pending setTimeout, setInterval, setImmidate?
  //  2. Any pending OS tasks? (ex. Server listening to port)
  //  3. Any pending long running operations? (like fs module)
  return (
    pendingTimers.length || pendingOSTasks.length || pendingOperations.length
  );
} // The func to check whether or not the event loop should run for another 'tick'

// The event loop - will execute all time the app is running
while (shouldContinue()) {
  // Every single run is called : 'tick' (all code runs in a click)
  // 1.  Node looks at pendingTimers and sees if any functions are ready to be called (setTimeout, setInterval)
  // 2.  Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks // Contains also the operations in the 'threadpool'
  // 3.  Node pause execution. Continue when...
  // 3.1.  - a new pendingOSTask is done
  // 3.2.  - a new pendingOperation is done
  // 3.3.  - a timer is about to complete
  // 4.  Look at pendingTimers (look only at function setImmidiate)
  // 5.  Handle any 'close' event (like readStream, running cleanup code, can be thought as flush)
  // Every iteration it is checked if the loop can be called again
}

// Exit Back to Terminal

//Q1
// Event loop : is a mechanism allow to node js to excute Async operations
// without block the main thread

//Q2
// Libuv :  is A c/c++ library , node js depend on it excute Async operations

//Q3
// Node.js handles asynchronous operations by pass them to the operating system
// or libuv's Thread Pool. when the operation becomes complete,
// event loop pass operation's callback to Call Stack when then Call Stack is available

//Q4
//The Call Stack is where JavaScript functions are executed usually sync functions .
//The Event Queue stores Aysnc operation's callbacks  after runnig these operation in Libuv
//The Event Loop checks the Call Stack is avaliable  and moves  operation's callbacks to the Call Stack for execution.

//Q5
//The Node.js Thread Pool is a group of worker threads managed by libuv and used for
//  asynchronous operations such as file system, DNS, cryptography,
// and compression tasks. Its default size is commonly 4,
// and it can be modified using the UV_THREADPOOL_SIZE


//Q6
// node js **Blocking:** Node.js waits for the operation to finish before continuing execution, which blocks the Main Thread.
//
//Non-Blocking: Node.js starts the operation and continues executing other code without
// waiting the operation for full excution,
// then handles the result when the operation finishes.
//Blocking: Node.js waits for the operation to finish before excute other operation,
// which blocks the Main Thread.



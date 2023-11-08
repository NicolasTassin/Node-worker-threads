const { workerData, parentPort } = require("worker_threads");

let counter = 0;
for (i=0; i< 20_000_000_000 / workerData.thread_count; i++){
    counter++
}

//way to communicate with main thread. (create a message)
parentPort.postMessage(counter)
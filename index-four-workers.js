const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const port = 3000;
const THREAD_COUNT = 4;

//create a function that will instantiate the workers depending on the THREAD_COUNT and passing data to the worker

function createWorker() {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./four-workers", {
      workerData: { thread_count: THREAD_COUNT },
    });
    // listen to specific event from this worker
    worker.on("message", (data) => {
      resolve(`Counter is ${data}`);
    });
    worker.on("error", (error) => {
      reject(`An error occured ${error}`);
    });
  });
}

// check number of cores (mac) => sysctl -n hw.ncpu
app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is non blocking");
});
app.get("/blocking", async (req, res) => {
  const workerPromises = [];

  // call function 4 times
  for (i = 0; i < THREAD_COUNT; i++) {
    workerPromises.push(createWorker());
  }
  const worker_results = await Promise.all(workerPromises);
  const total =
    worker_results[0] +
    worker_results[1] +
    worker_results[2] +
    worker_results[3];
  res.status(200).send(`Result is ${total}`);
});

app.listen(port, () => {
  console.log(`App is listenning on port ${port}`);
});

//BENCHMARK:

//time curl --get http://localhost:3000/blocking (on index.js): 
//2:02.55 total
//time curl --get http://localhost:3000/blocking (on index-four-workers.js): 
// 25.516 total
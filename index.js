const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const port = 3000;

// check number of cores (mac) => sysctl -n hw.ncpu
app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is non blocking");
});
app.get("/blocking", async (req, res) => {
  // instanciate new Worker with required worker path
  const worker = new Worker("./worker.js");

  // listen to specific event from this worker
  worker.on("message", (data) => {
    res.status(200).send(`Counter is ${data}`);
  });
  worker.on("error", (error) => {
    res.status(404).send(`An error occured ${error}`);
  });
});

app.listen(port, () => {
  console.log(`App is listenning on port ${port}`);
});

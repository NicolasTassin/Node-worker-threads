const { parentPort } = require("worker_threads");

let counter = 0;
for (i=0; i< 20_000_000_000; i++){
    counter++
}
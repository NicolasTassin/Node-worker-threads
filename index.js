const express = require("express");

const app = express();
const port = 3000;



app.get('/non-blocking', (req, res)=> {
    res.status(200).send('This page is non blocking')


})
app.get('/blocking', async (req, res)=> {
   
    res.status(200).send(`Counter is ${counter}`)
})







app.listen(port, ()=> {
    console.log(`App is listenning on port ${port}`)
})
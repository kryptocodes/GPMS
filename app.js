require('dotenv').config()

const mongoose = require("mongoose");
const express = require("express");
const app = express();

//dB connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log("DB CONNECTED")
}).catch(()=>
    console.log("Oops ERROR!!")
)

//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
});
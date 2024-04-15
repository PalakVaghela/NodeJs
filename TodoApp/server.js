// express is node js framework
const express = require("express");
const app = express();

// parse json data & add it ti requrest.body object
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(3000, ()=>{
    console.log("server started at port no 3000");
})

 // This function is called when a GET request is made to the root URL '/'
app.get('/', (request,responce)=>{
    responce.send("Hello")
})

// postman is used to check post request
app.post('/api/cars',(request,responce)=>{
    const {name,brand} = request.body;
    console.log(name);
    console.log(brand);
    responce.send("car submitted successfully");
})

const mongoose = require('mongoose');
// here my database not exist so it will create new database
mongoose.connect('mongodb://localhost:27017/myDatabase',{
    useNewurlParser:true,
    useUnifiedTopology:true
    // these 2 are configuration that we must have to write without any reason
})
.then(()=>{console.log("Connection Successful")})
.catch((error)=>{console.log("Recieved an error")});
// these 2 are promise statements of js
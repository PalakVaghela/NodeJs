// to craete server

const express = require("express");
const app = express();

// start server
// app.listen(3000, ()=>{
//     console.log("App is running successfully");
// })

// or 

require("dotenv").config();
const PORT = process.env.PORT || 4000;
// weather it will run on port which is given in .env or on port nodemon. 4000
// process is global object  It contains various properties and methods that allow you to interact with the environment in which your Node.js application is running. 

// middleware to parse json request body
app.use(express.json());

// import routes for todo API
const todoRoutes = require("./routes/Todoroute");
// mount the todo APTs routes means when we make changes then old will be mounted or changed as V1 to V2
app.use("/api/v1",todoRoutes);

// start server
app.listen(PORT, ()=>{
    console.log(`Server started successfully at ${PORT}`); 
})

// connected to the database and then call fun
const dbconnect = require("./config/database");

try {
    dbconnect();
} catch (err) {
    console.error("Error connecting to the database:", error);
}

// default route must write
 // This function is called when a GET request is made to the root URL '/' means at home page it will send responce
app.get("/",(request,responce)=>{
    responce.send(`<h1>This is HOMEPAGE baby</h1>`)
})

const express = require("express");
const router = express.Router();

// import controller to controll routes
const {createTodo}= require("../controller/createTodo");
const {getTodo, getTodobyid} = require("../controller/getTodo");
const {updateTodo} = require("../controller/updateTodo");
const {deleteTodo} = require("../controller/deleteTodo");
// we can also fetch data using id


// define API routes means all request which we want to use
router.post("/createTodo",createTodo);
router.get("/getTodo",getTodo);
router.get("/getTodo/:id",getTodobyid);
router.put("/updateTodo/:id",updateTodo);
router.delete("/deleteTodo/:id",deleteTodo);
// when we go to ^ this path then we have to give post request and can be control by controller createTodo obj

module.exports = router;
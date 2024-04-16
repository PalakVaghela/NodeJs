// used for controller
const express = require("express");
// rourt is in express so import express
const router = express.Router();


// ..1.. import controller 
// in which along const is method of that file location 
const {dummylink,likePost,unlikePost} = require("../controller/likecontroller");
const {Commentcontroller}= require("../controller/commentcontroller");
const {createPost}= require("../controller/postcontroller");
const {getAllpost}= require("../controller/postcontroller");


// ..2..perform mapping 
// it will call the method from  that /.. path  here we can provide any path at which we want to show it on browser
router.get("/dummylink",dummylink);
router.post("/comments/create",Commentcontroller); //comments is an array in which like is present
router.post("/post/create",createPost);
router.get("/post",getAllpost);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unlikePost);


//..3.. export
module.exports = router;


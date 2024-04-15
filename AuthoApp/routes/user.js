const express = require("express");
const router = express.Router();

const {login,signup} = require("../controller/Auth");
const {auth,isStudent,isAdmin} = require("../middleware/authmiddle");


// router.post("/login",login);
router.post("/signup",signup);
router.post("/login",login);

// create protected route
router.get("/tester",auth, (req,res)=>{
    res.status(500).json({
        success:true,
        message:"Welcome to protected route of tester "
    })
})

router.get("/student",auth,isStudent, (req,res)=>{
    res.status(500).json({
        success:true,
        message:"Welcome to protected route of student "
    })
})

router.get("/admin",auth,isAdmin, (req,res)=>{
    res.status(500).json({
        success:true,
        message:"Welcome to protected route of admin"
    })
})

module.exports = router;


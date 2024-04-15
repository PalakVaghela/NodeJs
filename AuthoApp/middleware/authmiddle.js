// // auth, isStudent, isAdmin
// // auth is used to check weather user is authorized or not
// // when any req. come we don't use login every time to check weather user is created or not so that we use middleware
const jwt = require("jsonwebtoken")
require("dotenv").config();

// // here next is used bc we want to move to another route which is next to this route so we have to also provide next to this route
exports.auth = (req,res,next)=>{
    try {
        // import toke  from req.body 1st method of token accessing
        // 2nd method: access from cookie 
        // 3rd: access from rwq.header
        // to access from cookie and body for both we have to use body parser or cookie parser so that 3rd method is safest method
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer "," ");
    
        if(!token){
            res.status(401).json({
                success:false,
                message:"Token is not available"
            })
        }

        // verify the token
        try {
            const decode = jwt.verify(token,process.env.JWT_secret);
            console.log(decode);
            //bc in future we want to access role from usermodel so we have to fetch it from decode 
            req.usermodel = decode
            
        } catch (error) {
            res.status(403).json({
                success:false,
                message:"Token is invalid"
            })
        }
        next();
        
    } catch (error) {
        res.status(403).json({
            success:false,
            message:"Something went wrong while verifying the token"
        })
        
    }
}

 // for /student
exports.isStudent = (req,res,next)=>{
    try {
        if(req.usermodel.role != "Student"){
            res.status(403).json({
                success:false,
                message:"Cannot access it is protected route for student"
            })
        }
        next();
    } catch (error) {
        res.status(403).json({
            success:false,
            message:"Error while accessing student protected route"
        })
        
    }
}

 // for /admin
exports.isAdmin = (req,res,next)=>{
    try {
        if(req.usermodel.role != "Admin"){
            res.status(403).json({
                success:false,
                message:"Cannot access it is protected route for admin"
            })
        }
        next();
        
    } catch (error) {
        res.status(403).json({
            success:false,
            message:"Error while accessing protected route of admin"
        })
        
    }
}
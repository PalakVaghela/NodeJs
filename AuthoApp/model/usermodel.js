const mongoose = require("mongoose");

const usermodel =new mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:["Admin","Student","Visitor"]
        }
        // now role can take only value from this three values
    }
)

module.exports=mongoose.model("usermodel", usermodel);
// can access userSchema as user

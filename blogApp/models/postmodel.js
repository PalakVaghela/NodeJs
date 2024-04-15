const mongoose= require("mongoose");

const postSchema= mongoose.Schema(
    {
        title:{
            type:String,
            require:true,
        },
        body:{
            type:String,
            require:true,
        },
        // we ahve to create array to store like and comment
        likes:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"likes",
        }],
        comments:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"comments",
        }]
    }
)
module.exports = mongoose.model("Post",postSchema);
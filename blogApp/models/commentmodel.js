const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post", // ref to postmodels
        },
        user:{
            type : String,
            require:true,

        },
        // comment is showable so it contain body but like don't contain
        body:{
            type : String,
            require:true,

        },
    }
)

module.exports = mongoose.model("comments", commentSchema);
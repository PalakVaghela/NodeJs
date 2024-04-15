const { json } = require("express");
const Post = require("../models/postmodel");

exports.createPost =async (req,res)=>{
    try{

        const {title,body}= req.body;

        const newPost = new Post({title,body});

        const savedPost = await newPost.save();

        res.json({
            post: savedPost,
          });
    }
    catch(error){
        return res.status(200).json({

            error:"Error in post creation"
        }    )
    }    
}

exports.getAllpost= async (req,res)=>{
    try{
        const allpost = await Post.find()
        .populate("comments")
        // because we have write comments in postmodels
        .exec()

        res.json({
            allpost,
        })
    }
    catch(error){
        return res.status(200).json({

            error:"Error in post creation"
        }    )
    }   
}
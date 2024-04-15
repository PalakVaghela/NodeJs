
const Post = require("../models/postmodel");
const Like = require("../models/likemodel");

exports.likePost = async (req, res) => {
  try {
    // Log request body
    console.log(`Like data: ${req.body}`);

    // Extract data with validation (add validation logic here)
    const { post, user } = req.body;

    // Create like object of class Like 
    const like = new Like({
      post,
      user
    });

   

    // Save comment object
    const savedLike = await like.save();

    // Update post with comment
    const updatedPost = await Post.findByIdAndUpdate(post, {
      $push: { likes: savedLike._id } // update in like array 
    }, { new: true })
    .populate("likes")
    .exec();


    console.log(`Updated post: ${updatedPost}`);

    res.json({
      post: updatedPost,
    });

  } catch (error) {
    console.error(error);
    // Consider logging more specific error details
    return res.status(500).json({
      error: "Error while creating like"
    });
  }
};


// ........unlike post.......................
exports.unlikePost = async (req,res)=>{
    try{
        const {post,like} = req.body;

        const deletedlike = await Post.findOneAndDelete({
            post:post, _id:like }) // update in like array 
          

       const updatedPost = await Post.findOneAndDelete(post, {$pull: {likes:deletedlike._id}},{new:true})

       res.json({
        post: updatedPost,
      });
    }
    catch{

    }
}

exports.dummylink = (req,res)=>{
    res.send("This is dummy link");
}



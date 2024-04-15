// // import model
// const Post = require("../models/postmodel");
// const comment = require("../models/commentmodel");

// // write logic for the same 
// exports.Commentcontroller = async (req, res) => {
//     try {
//         // fetch post user and body from req body
//         const { post, user, body } = req.body;

//         // make object for that same
//         const newComment = new comment({
//             post, user, body
//         });

//         // save it into the new database
//         const savecomment = await newComment.save();

//         // update new comment or add new comment  
//         // find the post by id and update new comment in that comment array
//         // new: true means it returns the updated document every time 
//         // here Post refers to the model and post refers to the schema field
//         const updatePost = await Post.findByIdAndUpdate(post,{ $push: { newComment: savecomment._id } },{ new: true }
//         )
//             .populate("comment")
//             .exec();

//             console.log('commentcontroller accessed'); // Add this line for debugging

//         res.json({
//             post: updatePost,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(200).json({
//             error: "Error while creating comment"
//         });
//     }
// }
// Import models with consistent case
const Post = require("../models/postmodel");
const Comment = require("../models/commentmodel");

exports.Commentcontroller = async (req, res) => {
  try {
    // Log request body
    console.log(`Comment data: ${req.body}`);

    // Extract data with validation (add validation logic here)
    const { post, user, body } = req.body;

    // Create comment object
    const newComment = new Comment({
      post,
      user,
      body
    });

    // Save comment object
    const savedComment = await newComment.save();
    console.log(`Saved comment: ${savedComment}`);

    // Update post with comment
    const updatedPost = await Post.findByIdAndUpdate(post, {
      $push: { comments: savedComment._id } // update in commemts array 
    }, { new: true })
      .populate("comments") // Assuming comments array path is "comments"
      .exec();

    console.log(`Updated post: ${updatedPost}`);

    res.json({
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    // Consider logging more specific error details
    return res.status(200).json({
      error: "Error while creating comment"
    });
  }
};


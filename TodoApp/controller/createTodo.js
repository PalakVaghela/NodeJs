// // import todo because we want to connect data with it's controller.

// const { response } = require("express");
// const Todo= require("../models/Todo")

// // when we hit on route then only we acn reach to controller so imort route handler
// //  request not affect on code when we use async  
// exports.createTodo = async(req,res) =>{
//     try{
//         // exctract title and desc. from body
//         const {title,description} = req.body;
//         // crate new todo object and insert to db. using await it will waite for some time
//         const create_obj=await Todo.create({title,description});
//         const responce = create_obj;
//         // send json res with sussecc flage
//         responce.status(200).json(
//             {
//                 success:true,
//                 data:responce,
//                 message: "Entry craeted successfully"

//             }
//         );

//     }
//     catch(err){
//         console.error(err);
//         console.log(err);
//         response.status(500)
//         .json({
//             success:false,
//             data:"Internal server error",
//             message:err.message,
//         })
//     }
//
const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        const createdTodo = await Todo.create({ title, description });

        // Use a different variable name for the response object, e.g., 'response'
        // when the client makes a request, and the server successfully creates a new Todo (as indicated by createdTodo), this code sends a JSON response back to the client with a 200 status code, indicating success. The response includes a success flag, the created data (createdTodo), and a descriptive message. The client can then use this information to understand the outcome of the request.
        res.status(200).json({
            success: true,
            data: createdTodo,
            message: "Entry created successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: err.message,
        });
    }
};



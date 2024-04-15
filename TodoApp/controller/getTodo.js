const Todo = require("../models/Todo");

exports.getTodo = async (req, res) => {
    try {
        // await in js used for async fun.It queries the MongoDB database to find all documents in the Todo collection.
        const todo = await Todo.find({});

        res.status(200).json({
            success: true,
            data: todo,
            message: "Data get sucessfull",
        })

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Internal server error data is not get",
        });
    }
};

exports.getTodobyid = async (req, res) => {
    try {
        // fatch id for which we want to data
        const id = req.params.id;
        console.log("Controller called with ID:");
        const todo = await Todo.findById({ _id: id });

        // if id don't match with any.
        if (!todo) {
            return res.status(404).json({

                success: false,
                message: `Id is not found`,
            }
            )
        }
        res.status(200).json({

            success: true,
            data: todo,
            message: `Id is not found at ${id}`,
        }
        )

    }
    catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message,
            message: `Internal server error data is not get`,
        });
    }
}

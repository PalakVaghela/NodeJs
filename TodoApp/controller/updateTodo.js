const Todo = require("../models/Todo");

exports.updateTodo = async (req, res) => {
    try {
        // fatch id for which we want to data
        const id = req.params.id;
        // get both of them from body what we enter
        const{title,description}= req.body;

        const todo = await Todo.findByIdAndUpdate(
            {_id:id},
            {title,description,upsateAt:Date.now()}
        );

        // if id don't match with any.
        if (!todo) {
            return res.status(404).json({

                success: false,
                message: `Not updated`,
            }
            )
        }
        res.status(200).json({

            success: true,
            data: todo,
            message: `Id successfully upadted at ${id}`,
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

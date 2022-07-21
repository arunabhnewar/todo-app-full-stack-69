// Dependencies
const Todo = require('../../models/Todo');


// Add New Task Function
async function addNewTaskController(req, res) {
    try {
        const { taskname, priority, date } = req.body;
        
        if (!taskname || !priority || !date) {
            return res.redirect('/')
        } else {
            const todo = new Todo({
                taskname,
                priority,
                date,
                status: "pending",
                user: req.email
            })
    
            const result = await todo.save();
            if (result) {
                return res.redirect('/')
            }
        }
      

    } catch (error) {
        throw error
    }
}



// Delete Task Function
async function deleteTaskController(req, res) {
    try {
        const taskId = req.params.taskId;
        const result = await Todo.deleteOne({ _id: taskId, user: req.email });

        if (result) {
            return res.redirect('/')
        }

    } catch (error) {
        throw error
    }
}



// Update Task Status Function
async function updateTaskStatusController(req, res) {
    try {
        const taskId = req.params.taskId;
        const task = await Todo.findOne({ _id: taskId, user: req.email });
        const status = task.status === "pending" ? "completed" : "pending";

        const result = await Todo.findOneAndUpdate({ _id: taskId, user: req.email },
            {
                $set: {
                    status: status
                }
            });

        if (result) {
            return res.redirect('/')
        }

    } catch (error) {
        throw error
    }
}



// After Update A Task
async function updateTaskController(req, res) {
    try {
        const { taskname, priority, date, id } = req.body;
        const result = await Todo.findOneAndUpdate({
            _id: id,
            user: req.email
        }, {
            $set: {
                taskname,
                priority,
                date
            }
        })

        if (result) {
            return res.redirect('/')
        }
    } catch (error) {
        throw error
    }
}



// Module Export
module.exports = { addNewTaskController, deleteTaskController, updateTaskStatusController, updateTaskController }
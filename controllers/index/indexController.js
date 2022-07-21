// Dependencies
const Todo = require("../../models/Todo");
const User = require("../../models/User");

const indexController = async (req, res) => {
    try {

        const todos = await Todo.find({ user: req.email });
        const user = await User.findOne({ email: req.email });
        const name = user? user.name : "anonymous"
        res.render('index', { todos, name })

    } catch (error) {
        throw error
    }
}


// Module Export
module.exports = indexController;
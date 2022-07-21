// Dependencies
const { Router } = require('express');
const { addNewTaskController, deleteTaskController, updateTaskStatusController, updateTaskController } = require('../controllers/todo/todo');
const { authChecker } = require('../middlewares/auth/authMiddleware');
const todoRoute = Router();



// Add A New Task
todoRoute.post('/addNewTask', authChecker, addNewTaskController)



// Delete A Task
todoRoute.get('/deleteTask/:taskId', authChecker, deleteTaskController)



// Update A Task Status
todoRoute.get('/updateStatus/:taskId', authChecker, updateTaskStatusController)


// After Update A Task 
todoRoute.post('/updateTask', authChecker, updateTaskController)




// Module Export
module.exports = todoRoute;
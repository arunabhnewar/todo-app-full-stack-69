// Dependencies
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errorHandler, notFoundHandler } = require('./middlewares/common/errorHandler');
const authRoute = require('./routes/authRoute');
const { authChecker } = require('./middlewares/auth/authMiddleware');
const todoRoute = require('./routes/todoRoute');
const indexController = require('./controllers/index/indexController');



// initialization and config
const app = express();
dotenv.config();
app.set('view engine', 'ejs');



// middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));



// Routes
app.use(authRoute)
app.use(todoRoute)
app.get('/', authChecker, indexController)



// Error Handler
app.use(errorHandler);



// Not Found Handler
app.use(notFoundHandler);



// Mongodb Connection
async function todoapp() {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database Fucked Successfully");
    } catch (error) {
        console.log(error);
    }
}



// Server Listen
app.listen(process.env.PORT || 3000, () => {
    todoapp();
    console.log("Server has been fucking on port" + ' ' + 3000);
})
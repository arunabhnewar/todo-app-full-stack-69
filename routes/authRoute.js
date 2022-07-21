// Dependencies
const { Router } = require('express');
const { signupPageController, signinPageController, signupController, signinController, signoutController, } = require('../controllers/auth/auth');
const { authChecker } = require('../middlewares/auth/authMiddleware');




// Router
const authRoute = Router()



// Sign Up Page Handler
authRoute.get('/signup', authChecker, signupPageController)


// User Sign Up Handler
authRoute.post('/signup', signupController)


// Sign In Page Handler
authRoute.get('/signin', authChecker, signinPageController)


// User Sign In Handler
authRoute.post('/signin', signinController)



// User Sign Out Handler
authRoute.get('/signout', signoutController)





// Module Export
module.exports = authRoute;
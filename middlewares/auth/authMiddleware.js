// Dependencies
const jwt = require('jsonwebtoken');


async function authChecker(req, res, next) {
    try {

        if (req.signedCookies.access_token) {
            const token = req.signedCookies.access_token.split(' ')[1];
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            req.email = decode.email;

            if (req.url === '/signin' || req.url === "/signup") {
                return res.redirect('/')
            }
            next();

        } else {

            if (req.url === '/signup') {
                return res.render('auth/signup', { err: null, emailError: false, passwordError: false, email: null, isError: false, isExist: false })
            }
            res.render('auth/signin', { err: null, emailError: false, passwordError: false, email: null, isExistData: false })
        }

    } catch (error) {

        if (error.message === "jwt expired") {
            
            if (req.url === '/signup') {
                return res.render('auth/signup', { err: null, emailError: false, passwordError: false, email: null, isError: false, isExist: false })
            }
            res.render('auth/signin', { err: null, emailError: false, passwordError: false, email: null, isExistData: false })
        }
        next(error)
    }
}




// Module Export
module.exports = { authChecker };
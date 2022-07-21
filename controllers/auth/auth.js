// Dependencies
const User = require('../../models/User')
const bcrypt = require('bcrypt')
const { hashStr } = require('../../utilities/utilities')
const jwt = require('jsonwebtoken');

const auth = {}



// Sign Up  Page Controller
auth.signupPageController = (req, res) => {
    try {
        res.render('auth/signup', {err: null, isError: false, isExist: false})
    } catch (error) {
        throw error
    }
}



// Sign Up Controller
auth.signupController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.render('auth/signup', {err: "Data must be required", isError: true, isExist: false});

        } else {
            const isEmailExist = await User.findOne({ email })

            if (isEmailExist) {
               res.render('auth/signup', {err: "Fucking User Already Exist", isError: false, isExist: true})
            } else {
                const user = new User({
                    name,
                    email,
                    password: await hashStr(password)
                })
        
                const result = await user.save();
                res.render("signupdone");
           }
        }

    } catch (error) {
        throw error
    }
}



// Sign In  Page Controller
auth.signinPageController = (req, res) => {
    try {
        res.render('auth/signin', { err: null, email: null, emailError: false, passwordError: false, isExistData: false })
    } catch (error) {
        throw error
    }
}



// Sign In Controller
auth.signinController = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            res.render('auth/signin', { err: "Data must be required", isExistData: true,  email: null, emailError: false, passwordError: false })
            
        } else {
            const user = await User.findOne({ email });

        if (user) {
            const isMatched = await bcrypt.compare(password, user.password);

            if (isMatched) {
                const token = await jwt.sign({
                    email
                }, process.env.JWT_SECRET, { expiresIn: "24h" })

                res.cookie('access_token', "Bearer " + token, { signed: true, httpOnly: true, secure: true });
                res.redirect("/")

            } else {
                res.render('auth/signin', { err: "Password is incorrect!!", isExistData: false, emailError: false, passwordError: true, email })
            }

        } else {
            res.render('auth/signin', { err: "User is not found!!", isExistData: false, emailError: true, passwordError: false, email })
        }

        }
    } catch (error) {
        throw error
    }
}



// Sign In Controller
auth.signoutController = (req, res) => {
    try {
        res.clearCookie('access_token');
        res.redirect('/signin')
    } catch (error) {
        throw error
    }
}




// Module Export
module.exports = auth;
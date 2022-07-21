// Dependencies
const { Schema, model } = require('mongoose');



const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
})



// Model
const User = model("User", userSchema);



// Module Export
module.exports = User;

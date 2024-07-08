const mongoose = require("mongoose");

const userdata = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^[A-Za-z\s]+$/.test(value);
            },
            message: props => `${props.value} is not a valid name! Only alphabetic characters are allowed.`
        }
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
 });

 const Register = new mongoose.model("Register", userdata);

 module.exports = Register;
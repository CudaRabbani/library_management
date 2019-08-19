const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const {UserInfo} = require('./userInfo');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        trim: true,
        unique: true
    },
    userinfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserInfo',
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    activatedOn: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('User', userSchema);

function userValidate(user) {
    const schema = {
        email: Joi.string().min(3).max(50).required().email(),
        userinfo: Joi.objectId(),
        password: Joi.string().min(5).max(255).required(),
        role: Joi.string().valid('admin', 'customer')
    };

    return Joi.validate(user, schema);
}

function passwordValidate (password) {
    const schema = {
        password: Joi.string().min(5).max(255).required(),
    };

    return Joi.validate(password, schema);
}

exports.User = User;
exports.validate = userValidate;
exports.passwordValidate = passwordValidate;



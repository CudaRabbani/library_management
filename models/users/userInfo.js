const mongoose = require('mongoose');
const Joi = require('joi');

const userinfoSchema = new mongoose.Schema({
    fname: {
        type: String,
        minlength: 1,
        maxlength: 30,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        minlength: 1,
        maxlength: 30,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 15,
        trim: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true,
        trim: true,
        unique: true
    },
    sex: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    address: {
        type: String,
        minlength: 1,
        maxlength: 100,
    },
    city: {
        type: String,
        minlength: 3,
        maxlength: 30,
        required: true,
        trim: true
    },
    postalCode: {
        type: String,
        minlength: 6,
        maxlength: 10,
        required: true,
        trim: true
    },
    province: {
        type: String,
        minlength: 2,
        maxlength: 20,
        trim: true,
        required: true
    },
    country: {
        type: String,
        minlength: 2,
        maxlength: 20,
        trim: true,
        required: true
    },
    dob: {
        type: Date,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    filledOn: {
        type: Date,
        default: Date.now()
    }
});

const UserInfo = mongoose.model('UserInfo', userinfoSchema);

function userInfoValidate(userinfo) {
    const schema = {
        fname: Joi.string().min(1).max(30).required(),
        lname: Joi.string().min(1).max(30).required(),
        email: Joi.string().min(3).max(50).required().email(),
        phone: Joi.string().min(10).max(15).required(),
        sex: Joi.string().valid('Male', 'Female').insensitive().required(),
        address: Joi.string().min(1).max(100),
        city: Joi.string().min(3).max(30).required(),
        postalCode: Joi.string().min(6).max(10).required(),
        province: Joi.string().min(2).max(20).required(),
        country: Joi.string().min(2).max(20).required(),
        dob: Joi.date()
    };

    return Joi.validate(userinfo, schema);
}

exports.UserInfo = UserInfo;
exports.validate = userInfoValidate;



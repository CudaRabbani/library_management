const mongoose = require('mongoose');
const Joi = require('joi');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 100,
        trim: true,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    sex: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    dob: {
        type: Date
    },
    language: {
        type: String,
        default: 'English'
    },
    country: {
        type: String,
        default: 'Unknown'
    }
});

const Author = mongoose.model('Author', authorSchema);

function validateAuthor(author) {
    const schema = {
        name: Joi.string().min(1).max(100).required(),
        sex: Joi.string().valid('Male', 'Female').insensitive().required(),
        language: Joi.string(),
        country: Joi.string(),
        dob: Joi.date()
    };

    return Joi.validate(author, schema);
}

exports.Author = Author;
exports.validate = validateAuthor;
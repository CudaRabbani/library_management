const mongoose = require('mongoose');
const Joi = require('joi');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

const Category = mongoose.model('Category', categorySchema);

function validateCategory(category) {
    const schema = {
        name: Joi.string().min(2).max(100).required()
    };

    return Joi.validate(category, schema);
}

exports.Category=Category;
exports.validate= validateCategory;
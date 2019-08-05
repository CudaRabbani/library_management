const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const {Author} = require('./author');
const {Category} = require('./category');

const bookSchema = new mongoose.Schema({
    title : {
        type: String,
        minlength: 1,
        maxlength: 100,
        trim: true,
        require: true
    },
    publish_date: {
        type: Date,
    },
    pages: {
        type: Number,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    abstract: {
        type: String,
        minlength: 10,
        maxlength: 1000,
        default: "This is a test abstract.",
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

const Book = mongoose.model('Book', bookSchema);

function bookValidate (book) {
    const schema = {
        title: Joi.string().min(1).max(100).required(),
        publish_date: Joi.date(),
        pages: Joi.number().min(10).max(2000).integer().required(),
        isActive: Joi.boolean(),
        abstract: Joi.string().min(1).max(1000),
        author: Joi.objectId(),
        category: Joi.objectId()
    };

    return Joi.validate(book, schema);
}

exports.Book = Book;
exports.validate = bookValidate;


const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

//const {Book} = require('./book');

const bookStatusSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    added_on: {
        type: Date,
        default: Date.now()
    },
    qtyInHand: {
        type: Number,
        default: 10
    },
    rent_per_day: {
        type: Number,
        default: 9.99
    }
});

const BookStatus = mongoose.model('BookStatus', bookStatusSchema);

function validateBookStatus (bookStatus) {
    const schema = {
        book: Joi.objectId(),
        cost: Joi.number().min(0.99).required(),
        qtyInHand: Joi.number().min(0).integer().required(),
        rent_per_day: Joi.number().min(0.99).required()
    };

    return Joi.validate(bookStatus, schema);
}

exports.BookStatus = BookStatus;
exports.validate = validateBookStatus;
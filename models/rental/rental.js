const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const rentalSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true
    },
    rental_date: {
        type: Date,
        default: Date.now()
    },
    return_date: {
        type: Date,
        required: true
    },
    total_fee: {
        type: Number,
        required: true
    }

});

const Rental = mongoose.model('Rental', rentalSchema);

function rentalValidate(rental) {
    const schema = {
        user: Joi.objectId(),
        book: Joi.objectId(),
        rental_date: Joi.date(),
        return_date: Joi.date().required(),
        total_fee: Joi.number().positive().precision(2).required()
    };
    //console.log(Joi.validate(rental, schema));
    return Joi.validate(rental, schema);
}


exports.Rental = Rental;
exports.validate = rentalValidate;
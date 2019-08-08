const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const Fawn = require('fawn');

const {Rental, validate} = require('../../models/rental/rental');
const {User} = require('../../models/users/user');
const {Book} = require('../../models/library/book');
const {BookStatus} = require('../../models/library/bookStatus');

Fawn.init(mongoose);

router.get('/', async (req, res) => {
    try{
        const rental = await Rental.find()
                            .populate('user', 'email -_id')
                            .populate('book', 'title -_id')
                            .select('user book rental_date return_date total_fee');
        res.send(rental);
    }
    catch(err) {
        console.log ('Rental GET error', err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const {errors} = await validate(req.body);
    }
    catch (err) {
        let error_msg = `${err.name}: ${err.details[0].message}`;
        console.log(error_msg);
        //console.log('validation error', err.message);
        return res.status(400).send(error_msg);
    }


    let newRental = _.pick(req.body, ['user', 'book', 'rental_date', 'return_date', 'total_fee']);
    try {
        let validUser = await User.findById(newRental.user);
        if (!validUser) {
            return res.status(400).send('Invalid User');
        }
    }
    catch (err) {
        console.log('Rentals: POST', err.message)
        return res.status(400).send(err.message);
    }
    let validBook = '';
    try {
        validBook = await Book.findById(newRental.book);
        if (!validBook) {
            return res.status(400).send('Invalid Book');
        }
    }
    catch (err) {
        return res.status(400).send(err.message);
    }
    let bookStatus = '';
    newRental = new Rental (newRental);
    try {
        bookStatus = await BookStatus.findOne({book: validBook._id});
        if (bookStatus.qtyInHand > 0) {
            await new Fawn.Task()
                .save('rentals', newRental)
                .update('bookstatuses', {book: validBook._id},{
                    $inc: {qtyInHand: -1}
                }).run();
        }
        else {
            return res.status(200).send('Out of Stock');
        }
        const testResult = {
            rental: newRental,
            bookStatus: bookStatus
        }
        return res.send(testResult);
    }
    catch(err) {
        return res.status(400).send('Fawn error',err.message);
    }

});


module.exports = router;

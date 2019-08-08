const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {BookStatus, validate} = require ('../../models/library/bookStatus');

router.get('/', async(req, res) => {
    try {
        const bookStatus = await BookStatus.find()
                            .populate('book', 'title')
                            .select('book cost added_on qtyInHand rent_per_day');
        res.send(bookStatus);
    }
    catch(err) {
        console.log('BookStatus: GET ', err.message);
        res.status(400).send(err.message);
    }
});

router.post('/', async(req, res) => {
    try {
        const {errors} = await validate(req.body);
    }
    catch (err) {
        let error_msg = `${err.name}: ${err.details[0].message}`;
        console.log(error_msg);
        return res.status(400).send(error_msg);
    }

    let newBookStatus = _.pick(req.body, ['book', 'cost', 'added_on', 'qtyInHand', 'rent_per_day']);
    newBookStatus = new BookStatus(newBookStatus);
    try {
        newBookStatus = await newBookStatus.save();
        res.send(newBookStatus);
    }
    catch(err) {
        console.log('BookStatus: POST ', err.message);
        res.status(400).send(err.message);
    }
});

module.exports=router;
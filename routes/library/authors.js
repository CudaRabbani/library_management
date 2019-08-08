const express = require('express');
const router = express.Router();
const _  = require('lodash');

const {Author, validate} = require('../../models/library/author');


router.get('/', async (req, res) => {
    try {
        const authors = await Author.find().select('name sex dob');
        return res.send(authors);
    }
    catch(err) {
        const msg = `Error in Authors get: "/" ${err.message}`;
        return res.status(400).send(msg);
    }
});

router.post('/', async (req, res) => {

    try {
        const {errors} = validate(req.body);
    }
    catch (err) {
        let error_msg = `${err.name}: ${err.details[0].message}`;
        console.log(error_msg);
        return res.status(400).send(error_msg);
    }

    let newAuthor = _.pick(req.body, ['name', 'sex', 'dob']);

    newAuthor = new Author(newAuthor);
    try {
        const author = await newAuthor.save();
        return res.send(author);
    }
    catch(err) {
        const msg = `Error in Authors post: "/" ${err.message}`;
        console.log(msg);
        return res.status(400).send(msg);
    }
});

module.exports = router;


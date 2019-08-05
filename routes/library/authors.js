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

    const {errors} = validate(req.body);

    if (errors) {
        console.log(errors.details[0].message);
        return res.status(400).send(errors.details[0].message);
    }
    let newAuthor = _.pick(req.body, ['name', 'sex', 'dob']);
    console.log(newAuthor);
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


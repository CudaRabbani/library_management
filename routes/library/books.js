const express = require('express');
const router = express.Router();
const _  = require('lodash');

const {Book, validate} = require('../../models/library/book');
const {Author} = require('../../models/library/author');
const {Category} = require('../../models/library/category');

router.get('/', async (req, res) => {
    try {
        const bookList = await Book
            .find()
            .populate('author', 'name -_id')
            .populate('category', 'name -_id')
            .select('title author category pages');
        return res.send(bookList);
    }
    catch (err) {
        const msg= `Book: GET:/ ${err.message}`;
        console.log(msg);
        return res.status(400).send(msg);
    }
});

router.post('/', async (req, res) => {
    const {errors} = validate(req.body);

    if (errors) {
        console.log(error.details[0].message);
        return res.status(400).send(error.details[0].message);
    }

    let newBook = _.pick(req.body,
        ['title', 'publish_date', 'pages', 'isActive', 'abstract', 'author', 'category']);

    try {
        const author = await Author.findById(newBook.author);
        if (!author) {
            return res.status(400).send('Invalid Author');
        }
        const category = await Category.findById(newBook.category);
        if (!category) {
            return res.status(400).send('Invalid Category');
        }
    }
    catch (err) {
        console.log(err.message);
        return res.status(400).send('Invalid request');
    }

    newBook = new Book(newBook);
    try {
        const book = await newBook.save();
        return res.send(book);
    }
    catch (err) {
        const msg= `Book: POST:/ ${err.message}`;
        console.log(msg);
        return res.status(400).send(msg);
    }
});

module.exports = router;
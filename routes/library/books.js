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
            .populate('author', 'name _id')
            .populate('category', 'name _id')
            .select('title author category pages isActive publish_date');
        return res.send(bookList);
    }
    catch (err) {
        const msg= `Book: GET:/ ${err.message}`;
        console.log(msg);
        return res.status(400).send(msg);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const bookList = await Book.findById(req.params.id)
            .populate('category', 'name _id')
            .populate('author', 'name _id')
            .select('title author category pages abstract isActive publish_date');
        return res.send(bookList);
    }
    catch (err) {
        const msg= `Book: GET(id):/ ${err.message}`;
        console.log(msg);
        return res.status(400).send(msg);
    }
});

router.post('/', async (req, res) => {

    try {
        const {errors} = await validate(req.body);
    }
    catch (err) {
        let error_msg = `${err.name}: ${err.details[0].message}`;
        console.log('validation error:',error_msg);
        return res.status(400).send(error_msg);
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

router.put('/:id', async (req, res) => {

    try {
        const {errors} = validate(req.body);
    }
    catch (err) {
        let error_msg = `${err.name}: ${err.details[0].message}`;
        console.log('validation error:',error_msg);
        return res.status(400).send(error_msg);
    }

    let newBook = _.pick(req.body, ['title', 'publish_date', 'pages', 'abstract', 'author', 'category']);
    console.log(newBook);

    try {
        const author = await Author.findById(newBook.author);
        const category = await Category.findById(newBook.category);
        if (!author || !category) {
            return res.status(400).send('Invalid Author or Category');
        }
        const book = await Book.findByIdAndUpdate(req.params.id, newBook);
        return res.send(book);
    }
    catch(err) {
        const msg = `Error in Book put: "/" ${err.message}`;
        console.log(msg);
        return res.status(400).send(msg);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        return res.send(book);
    }
    catch(err) {
        const msg = `Error in Book Delete: "/" ${err.message}`;
        console.log(msg);
        return res.status(400).send(msg);
    }
});

module.exports = router;
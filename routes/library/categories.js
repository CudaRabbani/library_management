const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {Category, validate} = require('../../models/library/category');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        return res.send(categories);
    }
    catch(err) {
        const msg = `Error in get: "/" ${err.message}`;
        return res.status(400).send(msg);
    }
});

router.post('/', async (req, res) => {
    const {errors} = validate(req.body);

    if (errors) {
        return res.status(400).send(error.details[0].message);
    }

    let newCategory = _.pick(req.body, ['name']);
    let category = new Category (newCategory);
    try {
        category = await category.save();
        return res.send(category);
    }
    catch(err) {
        const msg = `Error in post: "/" ${err.message}`;
        return res.status(400).send(msg);
    }
});

module.exports = router;
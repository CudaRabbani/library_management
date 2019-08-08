const express = require('express');
const router = express.Router();
const _ = require('lodash');

const auth = require('../../middleware/auth');
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

    /*if (req.user._role === 'customer') {
        return res.status(403).send('You are not authorized to add category');
    }*/


    try {
        const {errors} = await validate(req.body);
    }
    catch (err) {
        let error_msg = `${err.name}: ${err.details[0].message}`;
        console.log(error_msg);
        return res.status(400).send(error_msg);
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
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');

const {User} = require('../models/users/user');

router.post('/', async (req, res) => {

    const {errors} = validate(req.body);
    if (errors) {
        const msg = `Login POST: ${errors.details[0].message}`;
        console.log(msg);
        return res.status(400).send(msg);
    }
    let user= '';
    try {
        user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).send('Invalid User/Password');
        }
    }
    catch (err) {
        return res.status(400).send('Auth error');
    }

    try {
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send('Invalid Password/User');
        }
    }
    catch(err) {
        const msg = `User error POST "/" ${err.message}`;
        console.log(msg);
        return res.status(400).send(msg);
    }

    res.status(200).send('Login Successful');
});

function validate(req) {
    const schema = {
        email: Joi.string().min(3).max(50).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;
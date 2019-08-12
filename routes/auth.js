const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const {User} = require('../models/users/user');


router.post('/', async (req, res) => {

    try {
        const {errors} = await validate(req.body);
    }
    catch (err) {
        let error_msg = `${err.name}: ${err.details[0].message}`;
        console.log(error_msg);
        return res.status(400).send(error_msg);
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

    const token=jwt.sign({_id: user._id, _role: user.role}, config.get('jwtPrivateKey'));
    return res.header('x-auth-token', token)
        .header("access-control-expose-headers", "x-auth-token")
        .status(200).send('Login Succesful');
});

function validate(req) {
    const schema = {
        email: Joi.string().min(3).max(50).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(req, schema);
}

module.exports = router;
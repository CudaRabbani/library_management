const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');

const {User, validate} = require('../../models/users/user');

router.get('/', async (req, res) => {
    try {
        const users = await User
            .find()
            .populate('userinfo', 'fname lname')
            .select();
        return res.send(users);
    }
    catch (err) {
        const msg= `User: GET:/ ${err.message}`;
        console.log(msg);
        return res.status(400).send(msg);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const users = await User
            .findById(req.params.id)
            .populate('userinfo', 'fname lname')
            .select();
        return res.send(users);
    }
    catch (err) {
        const msg= `User: GET(ID):/ ${err.message}`;
        console.log(msg);
        return res.status(400).send(msg);
    }
});

router.post('/', async (req, res) => {

    const {errors} = validate(req.body);
    if (errors) {
        const msg = `User POST: ${errors.details[0].message}`;
        console.log(msg);
        return res.status(400).send(msg);
    }

    try {
        const user = await User.findOne({email: req.body.email});
        if (user) {
            return res.status(400).send('User already exist');
        }
    }
    catch (err) {
        return res.status(400).send('User check error');
    }

    let newUser = _.pick(req.body, ['email', 'password', 'userinfo', 'role']);
    let {password} = newUser;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    newUser.password = hashedPass;

    newUser = new User(newUser);

    try {
        newUser = await newUser.save();
        return res.send(newUser);
    }
    catch(err) {
        const msg = `User error POST "/" ${err.message}`;
        console.log(msg);
        return res.status(400).send(msg);
    }
});


module.exports = router;
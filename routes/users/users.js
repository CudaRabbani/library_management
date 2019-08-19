const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Fawn = require('fawn');

const {User, validate, passwordValidate} = require('../../models/users/user');
const {UserInfo} = require ('../../models/users/userInfo');

const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

router.get('/', async (req, res) => {
    try {
        const users = await User
            .find()
            .populate('userinfo', 'fname lname isActive')
            .select();

        //const users = tempUsers.filter( user=> user.userinfo.isActive ? user : null);

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

router.put('/password/:id', async (req, res) => {

    try {
        const error = await passwordValidate(req.body);
    }
    catch (err) {
        const msg = err.name+' '+err.details[0].message;
        return res.status(400).send(msg);
    }

    try {
        let newPassword = _.pick(req.body, ['password']);
        let {password} = newPassword;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const userInfo = await UserInfo.findById(req.params.id);
        //const user = await User.findOne({email: userInfo.email});
        //userInfo['isActive'] = true;
        //user['isActive'] = true;
        //user['password']=hashedPass;
        //await userInfo.save();
        //await user.save();
        await new Fawn.Task()
            .update("userinfos", {_id: req.params.id},{isActive: true})
            .update("users", {email: userInfo.email}, {password: hashedPass})
            .run();
        return res.send('Password Updated');
    }
    catch(err) {
        const msg = `Password reset error ${err.message}`;
        res.status(400).send(msg);
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
        const userInfo = await UserInfo.findOne({email: req.body.email});
        userInfo['isActive']=true;
        await userInfo.save();
        newUser = await newUser.save();
        return res.send(newUser);
    }
    catch(err) {
        const msg = `User error POST "/" ${err.message}`;
        console.log(msg);
        return res.status(400).send(msg);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const userInfo_id = user.userinfo;
        const userInfo = await UserInfo.findById(userInfo_id);
        //console.log(user);
        //console.log(userInfo);
        user['isActive'] = false;
        userInfo['isActive'] = false;
        await user.save();
        await userInfo.save();
        return res.send(user);
    }
    catch(err) {
        const msg = `Error in User Delete: "/" ${err.message}`;
        console.log(msg);
        return res.status(400).send(msg);
    }
});


module.exports = router;
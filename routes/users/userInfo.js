const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {UserInfo, validate} = require('../../models/users/userInfo');

const auth = require('../../middleware/auth');
const haveAccess = require('../../middleware/haveAccess');

router.get('/', async (req, res) => {
    try {
        const userinfos = await UserInfo.find().sort({'fname': 1});
        return res.send(userinfos);
    }
    catch(err) {
        const msg = `UserInfo Error (GET): "/" ${err.message}`;
        console.log(msg);
        res.status(400).send(msg);
    }
});

router.get('/:id', [auth, haveAccess], async (req, res) => {
    try {
        const userinfo = await UserInfo.findById(req.params.id);
        return res.send(userinfo);
    }
    catch(err) {
        const msg = `UserInfo Error (GET):ID "/" ${err.message}`;
        console.log(msg);
        res.status(400).send(msg);
    }
});

router.get('/email/:id', async (req, res) => {
    try {
        const userinfo = await UserInfo.findOne({email:req.params.id});
        console.log(userinfo);
        return res.send(userinfo);
    }
    catch(err) {
        const msg = `UserInfo Error (GET):Email "/" ${err.message}`;
        console.log(msg);
        res.status(400).send(msg);
    }
});

router.post('/', async (req, res) => {

    const {errors} = validate(req.body);
    if (errors) {
        const msg = `UserInfo Error post validate:  ${errors.details[0].message}`;
        console.log(msg);
        res.status(400).send(msg);
    }

    const newUserInfo = _.pick(req.body, ['fname', 'lname', 'phone', 'sex', 'email',
                        'address', 'city', 'postalCode', 'province', 'country', 'dob']);
    let newUser = new UserInfo(newUserInfo);
    try {
        newUser = await newUser.save();
        return res.send(newUser);
    }
    catch(err) {
        const msg = `UserInfo Error (POST): "/" ${err.message}`;
        console.log(msg);
        res.status(400).send(msg);
    }
});

router.put('/:id', async (req, res) => {

    try {
        const {errors} = validate(req.body);
    }
    catch (err) {
        let error_msg = `${err.name}: ${err.details[0].message}`;
        console.log('Userinfo validation error:',error_msg);
        return res.status(400).send(error_msg);
    }

    const newUserInfo = _.pick(req.body, ['fname', 'lname', 'phone', 'sex', 'email',
        'address', 'city', 'postalCode', 'province', 'country', 'dob']);

    try {
        let newUser = await UserInfo.findByIdAndUpdate(req.params.id, newUserInfo);
        return res.send(newUser);
    }
    catch(err) {
        const msg = `UserInfo Error (PUT): "/" ${err.message}`;
        console.log(msg);
        res.status(400).send(msg);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const userinfo = await UserInfo.findByIdAndDelete(req.params.id);
        return res.send(userinfo);
    }
    catch(err) {
        const msg = `Error in UserInfo Delete: "/" ${err.message}`;
        console.log(msg);
        return res.status(400).send(msg);
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {UserInfo, validate} = require('../../models/users/userInfo');

const auth = require('../../middleware/auth');
const haveAccess = require('../../middleware/haveAccess');
const admin = require('../../middleware/admin');

router.get('/', async (req, res) => {
    try {
        const userinfos = await UserInfo.find().sort({'fname': 1});
        return res.send(userinfos);
    }
    catch(err) {
        const msg = `UserInfo Error (GET): "/" ${err.message}`;
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
        res.status(400).send(msg);
    }
});

router.get('/email/:id', async (req, res) => {
    try {
        const userinfo = await UserInfo.findOne({email:req.params.id});
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
    let newUser = '';
    try {
        newUser = new UserInfo(newUserInfo);
        newUser = await newUser.save();
    }
    catch(err) {
        const msg = `UserInfo Error (POST): "/" ${err.message}`;
        console.log(msg);
        res.status(400).send(msg);
    }
    return res.send(newUser);
});

router.put('/:id', [auth, haveAccess], async (req, res) => {

    console.log(req.body);

    try {
        const {errors} = await validate(req.body);
    }
    catch (err) {
        let error_msg = `${err.name}: ${err.details[0].message}`;
        return res.status(400).send(error_msg);
    }

    const newUserInfo = _.pick(req.body, ['fname', 'lname', 'phone', 'sex',
        'address', 'city', 'postalCode', 'province', 'country', 'dob']);

    let newUser='';

    try {
        newUser = await UserInfo.updateOne({_id: req.params.id}, newUserInfo, {new: true});
    }
    catch(err) {
        const msg = `UserInfo Error (PUT): "/" ${err.message}`;
        res.status(400).send(msg);
    }

    return res.send(newUser);
});

router.delete('/:id', [auth, admin], async(req, res) => {
    try {
        const userinfo = await UserInfo.findByIdAndDelete(req.params.id);
        return res.send(userinfo);
    }
    catch(err) {
        const msg = `Error in UserInfo Delete: "/" ${err.message}`;
        return res.status(400).send(msg);
    }
});

module.exports = router;
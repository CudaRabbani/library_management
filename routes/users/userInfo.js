const express = require('express');
const router = express.Router();
const _ = require('lodash');

const {UserInfo, validate} = require('../../models/users/userInfo');

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

module.exports = router;
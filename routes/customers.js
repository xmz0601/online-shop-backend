const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../modules/authorization');
const { Customer, validateCustm, putCustmValidate } = require('../models/customer');
const getUserList = require('../modules/users/get-users-list');
const addUser = require('../modules/users/add-user');
const changeState = require('../modules/users/change-user-state');
const queryUser = require('../modules/users/query-user');
const editUser = require('../modules/users/edit-user');
const deleteUser = require('../modules/users/delete-user');

const router = express.Router();

router.route('/')
    // get customers list
    .get((req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        getUserList(req, res, Customer);
    })
    // add customer
    .post(async(req, res) => {
        // auth(req, res, ['normal']);
        // verify params
        const { error } = validateCustm(req.body);
        if (error) return res.sendResult(null, 400, error.message);
        // check if this email has been registered
        let user = await Customer.findOne({ email: req.body.email.trim() });
        // user = obj or null
        if (user) return res.sendResult(null, 400, 'this email has been registered');

        // add to db
        let salt = await bcrypt.genSalt(10);
        let newPwd = await bcrypt.hash(req.body.password.trim(), salt);
        req.body.password = newPwd;
        await Customer.create(req.body);
        // prepare return data
        let resultData = await Customer.findOne({ email: req.body.email }).lean();
        // generate a token
        let myToken = jwt.sign({
            role: 'normal',
        }, 'secretkey', {
            expiresIn: '1d'
        });
        resultData.token = myToken;
        res.sendResult(resultData, 201, 'create user successfully');
    });


router.route('/:id/state/:state')
    // change state of customer
    .put((req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        changeState(req, res, Customer);
    });


router.route('/:id')
    .get((req, res) => {
        const continueFlag = auth(req, res, ['admin', 'normal']);
        if (continueFlag != 'ok') return;

        queryUser(req, res, Customer);
    })
    .put((req, res) => {
        const continueFlag = auth(req, res, ['admin', 'normal']);
        if (continueFlag != 'ok') return;

        // verify params
        const { error } = putCustmValidate(req.body);
        if (error) return res.sendResult(null, 400, error.message);
        editUser(req, res, Customer);
    })
    .delete((req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        deleteUser(req, res, Customer);
    });


module.exports = router;
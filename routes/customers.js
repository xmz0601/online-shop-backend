const express = require('express');
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
        auth(req, res, ['admin']);
        getUserList(req, res, Customer);
    })
    // add customer
    .post((req, res) => {
        auth(req, res, ['normal']);
        // varify params
        const { error } = validateCustm(req.body);
        if (error) return res.sendResult(null, 400, error.message);
        addUser(req, res, Customer);
    });


router.route('/:id/state/:state')
    // change state of customer
    .put((req, res) => {
        auth(req, res, ['admin']);
        changeState(req, res, Customer);
    });


router.route('/:id')
    .get((req, res) => {
        auth(req, res, ['admin', 'normal']);
        queryUser(req, res, Customer);
    })
    .put((req, res) => {
        auth(req, res, ['admin', 'normal']);
        // varify params
        const { error } = putCustmValidate(req.body);
        if (error) return res.sendResult(null, 400, error.message);
        editUser(req, res, Customer);
    })
    .delete((req, res) => {
        auth(req, res, ['admin']);
        deleteUser(req, res, Customer);
    });


module.exports = router;
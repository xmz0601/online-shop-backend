const express = require('express');
const auth = require('../modules/authorization');
const { Staff, validateStaff, putStaffValidate } = require('../models/staff');
const getUserList = require('../modules/users/get-users-list');
const addUser = require('../modules/users/add-user');
const changeState = require('../modules/users/change-user-state');
const queryUser = require('../modules/users/query-user');
const editUser = require('../modules/users/edit-user');
const deleteUser = require('../modules/users/delete-user');

const router = express.Router();

router.route('/')
    // get staffs list
    .get((req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        getUserList(req, res, Staff);
    })
    // add new staff
    .post((req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        // verify params
        const { error } = validateStaff(req.body);
        if (error) return res.sendResult(null, 400, error.message);
        addUser(req, res, Staff);
    });


router.route('/:id/state/:state')
    // change state of staff
    .put((req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        changeState(req, res, Staff);
    });


router.route('/:id')
    .get((req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        queryUser(req, res, Staff);
    })
    .put((req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        // verify params
        const { error } = putStaffValidate(req.body);
        if (error) return res.sendResult(null, 400, error.message);
        editUser(req, res, Staff);
    })
    .delete((req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        deleteUser(req, res, Staff);
    });


module.exports = router;
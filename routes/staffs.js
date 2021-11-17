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
        auth(req, res, ['admin']);
        getUserList(req, res, Staff);
    })
    // add new staff
    .post((req, res) => {
        auth(req, res, ['admin']);
        // varify params
        const { error } = validateStaff(req.body);
        if (error) return res.sendResult(null, 400, error.message);
        addUser(req, res, Staff);
    });


router.route('/:id/state/:state')
    // change state of staff
    .put((req, res) => {
        auth(req, res, ['admin']);
        changeState(req, res, Staff);
    });


router.route('/:id')
    .get((req, res) => {
        auth(req, res, ['admin']);
        queryUser(req, res, Staff);
    })
    .put((req, res) => {
        auth(req, res, ['admin']);
        // varify params
        const { error } = putStaffValidate(req.body);
        if (error) return res.sendResult(null, 400, error.message);
        editUser(req, res, Staff);
    })
    .delete((req, res) => {
        auth(req, res, ['admin']);
        deleteUser(req, res, Staff);
    });


module.exports = router;
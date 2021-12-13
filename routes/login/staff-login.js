const express = require('express');
const { Staff } = require('../../models/staff');
const loginVerify = require('../../modules/login-verify');

const router = express.Router();

router.post('/', (req, res) => {
    loginVerify(req, res, Staff);
});

module.exports = router;
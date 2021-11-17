const express = require('express');
const { Customer } = require('../../models/customer');
const loginVerify = require('../../modules/login-verify');

const router = express.Router();

router.post('/', (req, res) => {
    loginVerify(req, res, Customer);
});

module.exports = router;
const express = require('express');

const router = express.Router();

router.route('/slogin')
    .post(require('./login/staff-login.js'));
router.route('/clogin')
    .post(require('./login/custm-login.js'));

router.route('/staffs')
    // get staffs list
    .get(require('./users/get-staffs-list.js'));
// add new staff

router.route('/customers')
    // get customers list
    .get(require('./users/get-custms-list.js'));


router.get('/test', require('./test.js'));


module.exports = router;
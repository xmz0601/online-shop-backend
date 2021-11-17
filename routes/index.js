const express = require('express');

const router = express.Router();

router.route('/slogin')
    .post(require('./login/staff-login.js'));
router.route('/clogin')
    .post(require('./login/custm-login.js'));

router.route('/staffs')
    // get staffs list
    .get(require('./users/get-staffs-list.js'))
    // add new staff
    .post(require('./users/add-staff.js'));

router.route('/customers')
    // get customers list
    .get(require('./users/get-custms-list.js'))
    // add customer
    .post(require('./users/add-custm.js'));

router.route('/staffs/:id/state/:state')
    // change state of staff
    .put(require('./users/change-staff-state.js'));

router.route('/customers/:id/state/:state')
    // change state of customer
    .put(require('./users/change-custm-state.js'));

router.route('/staffs/:id')
    .get(require('./users/query-staff.js'))
    .put(require('./users/edit-staff.js'));

router.route('/customers/:id')
    .get(require('./users/query-custm.js'))
    .put(require('./users/edit-custm.js'));



router.get('/test', require('./test.js'));


module.exports = router;
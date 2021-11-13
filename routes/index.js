const express = require('express');

const router = express.Router();

router.route('/slogin')
    .post(require('./login/staff-login.js'));
router.route('/clogin')
    .post(require('./login/custm-login.js'));



router.get('/test', require('./test.js'));


module.exports = router;
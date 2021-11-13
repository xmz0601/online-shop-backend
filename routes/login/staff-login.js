const { Staff } = require('../../models/staff.js');
const loginVerify = require('../../modules/login-verify.js')

module.exports = async(req, res) => {
    loginVerify(req, res, Staff);
};
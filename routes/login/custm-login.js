const { Customer } = require('../../models/customer.js');
const loginVerify = require('../../modules/login-verify.js')

module.exports = async(req, res) => {
    loginVerify(req, res, Customer);
};
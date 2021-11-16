const { Customer } = require('../../models/customer.js');
const auth = require('../../modules/authorization.js');
const changeState = require('../../modules/users/change-user-state.js');

module.exports = (req, res) => {
    auth(req, res, ['admin']);
    changeState(req, res, Customer);
};
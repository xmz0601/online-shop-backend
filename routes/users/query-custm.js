const { Customer } = require('../../models/customer.js');
const auth = require('../../modules/authorization.js');
const queryUser = require('../../modules/users/query-user.js');

module.exports = (req, res) => {
    auth(req, res, ['admin']);
    queryUser(req, res, Customer);
};
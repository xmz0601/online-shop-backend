const { Customer } = require('../../models/customer.js');
const auth = require('../../modules/authorization.js');
const deleteUser = require('../../modules/users/delete-user.js');

module.exports = (req, res) => {
    auth(req, res, ['admin']);
    deleteUser(req, res, Customer);
};
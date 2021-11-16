const { Customer, validateCustm } = require('../../models/customer.js');
const auth = require('../../modules/authorization.js');
const addUser = require('../../modules/users/add-user.js');

module.exports = (req, res) => {
    auth(req, res, ['admin']);

    // varify params
    const { error } = validateCustm(req.body);
    if (error) return res.sendResult(null, 400, error.message);

    addUser(req, res, Customer);
};
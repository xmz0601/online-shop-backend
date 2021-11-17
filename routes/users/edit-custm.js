const { Customer, putCustmValidate } = require('../../models/customer.js');
const auth = require('../../modules/authorization.js');
const editUser = require('../../modules/users/edit-user.js');

module.exports = (req, res) => {
    auth(req, res, ['admin']);

    // varify params
    const { error } = putCustmValidate(req.body);
    if (error) return res.sendResult(null, 400, error.message);

    editUser(req, res, Customer);
};
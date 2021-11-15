const { Staff } = require('../../models/staff.js');
const getUserList = require('../../modules/users/get-users-list.js');
const auth = require('../../modules/authorization.js');

module.exports = async(req, res) => {
    auth(req, res, ['admin']);
    getUserList(req, res, Staff);
};
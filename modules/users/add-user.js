const bcrypt = require('bcrypt');

module.exports = async(req, res, model) => {
    // check if this email has been registered
    let user = await model.findOne({ email: req.body.email.trim() });
    // user = obj or null
    if (user) return res.sendResult(null, 400, 'this email has been registered');

    // add to db
    let salt = await bcrypt.genSalt(10);
    let newPwd = await bcrypt.hash(req.body.password.trim(), salt);
    req.body.password = newPwd;
    let resultData = await model.create(req.body);
    res.sendResult(resultData, 201, 'create user successfully');
};
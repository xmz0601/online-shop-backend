const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async(req, res, model) => {
    let { email, password } = req.body;
    // a second-time verification
    if (email.trim().length == 0) return res.sendResult(null, 400, 'email is required');
    if (password.trim().length == 0) return res.sendResult(null, 400, 'password is required');

    // user = null or obj
    let user = await model.findOne({ email: email }).lean();
    // email is not found
    if (!user) return res.sendResult(null, 400, 'email is wrong');

    // verify password
    let isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.sendResult(null, 400, 'password is wrong');

    // log in successfully
    // generate a token
    let myToken = jwt.sign({
        role: user.role,
    }, 'secretkey', {
        expiresIn: '1d'
    });
    user.token = myToken;
    res.sendResult(user, 200, 'login successfully');
};
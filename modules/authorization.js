const jwt = require('jsonwebtoken');

module.exports = (req, res, roles) => {
    let continueFlag = 'not ok';
    let token = req.headers.authorization;
    if (!token) {
        res.sendResult(null, 401, 'token is missing');
        return continueFlag;
    }
    let decoded = {};
    try {
        decoded = jwt.verify(token, 'secretkey');
    } catch (err) {
        // err
        res.sendResult(null, 401, 'invalid token');
        return continueFlag;
    } finally {
        if (decoded.role && roles.includes(decoded.role)) {
            continueFlag = 'ok';
        } else {
            res.sendResult(null, 403, 'forbidden request');
        }
        return continueFlag;
    }
};
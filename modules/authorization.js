const jwt = require('jsonwebtoken');

module.exports = (req, res, roles) => {
    let token = req.headers.authorization;
    if (!token) return res.sendResult(null, 401, 'token is missing');

    jwt.verify(token, 'secretkey', function(err, decoded) {
        if (err) return res.sendResult(null, 401, 'invalid token');
        if (!roles.includes(decoded.role)) return res.sendResult(null, 403, 'forbidden request');
    });
};
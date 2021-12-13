const express = require('express');
const { Customer } = require('../../models/customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/', async(req, res) => {
    let { email, password } = req.body;
    // a second-time verification
    if (email.trim().length == 0) return res.sendResult(null, 400, 'email is required');
    if (password.trim().length == 0) return res.sendResult(null, 400, 'password is required');
    // user = null or obj
    let user = await Customer.findOne({ email: email }).lean();
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

    if (user.cart.length > 0) {
        // look up goods
        const detailedUser = await Customer.aggregate([{
                $unwind: {
                    path: '$cart'
                }
            },
            {
                $lookup: {
                    from: 'goods',
                    localField: 'cart.goodsId',
                    foreignField: '_id',
                    as: 'cart.cart_item'
                }
            },
            {
                $unwind: {
                    path: '$cart.cart_item'
                }
            },
            {
                $group: {
                    _id: '$_id',
                    cart: {
                        $push: '$cart'
                    }
                }
            },
            {
                $lookup: {
                    from: 'customers',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'custmDetails'
                }
            },
            {
                $unwind: {
                    path: '$custmDetails'
                }
            },
            {
                $addFields: {
                    'custmDetails.cart': '$cart'
                }
            },
            {
                $replaceRoot: {
                    newRoot: '$custmDetails'
                }
            },
            { $match: { email: email } }
        ]);
        user.cart = detailedUser[0].cart;
    }
    res.sendResult(user, 200, 'login successfully');
});

module.exports = router;
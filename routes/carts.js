const express = require('express');
const { Good } = require('../models/good');
const { Customer } = require('../models/customer');
const auth = require('../modules/authorization');
const mongoose = require('mongoose');

const router = express.Router();

router.route('/:uid/goods/:gid')
    // add goods to cart
    .post((req, res) => {
        const continueFlag = auth(req, res, ['normal']);
        if (continueFlag != 'ok') return;

        let { uid, gid } = req.params;
        // verify params
        Customer.findOne({ _id: uid }, function(cerr, cresult) {
            if (cerr || !cresult) return res.sendResult(null, 400, 'this uid does not exist');
            Good.findOne({ _id: gid }, async function(gerr, gresult) {
                if (gerr || !gresult) return res.sendResult(null, 400, 'this gid does not exist');
                // check if this goods has been in the cart
                let inCart = false;
                cresult.cart.forEach((item) => {
                    if (item.goodsId == gid) {
                        inCart = true;
                        item.goodsNum++;
                        return;
                    }
                });
                // not found
                if (!inCart) {
                    let newGoods = {};
                    newGoods.goodsNum = 1;
                    newGoods.goodsId = gid;
                    cresult.cart.push(newGoods);
                }
                await cresult.save();
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
                    { $match: { _id: mongoose.Types.ObjectId(uid) } }
                ]);
                res.sendResult(detailedUser[0], 201, 'add goods to cart successfully');
            });
        });
    })
    // change number of goods in cart
    .put((req, res) => {
        const continueFlag = auth(req, res, ['normal']);
        if (continueFlag != 'ok') return;

        let { uid, gid } = req.params;
        let { num } = req.body;
        // verify params
        if (!num || num <= 0) return res.sendResult(null, 400, "wrong param: num");
        num = parseInt(num);
        Customer.findOne({ _id: uid }, async function(err, result) {
            if (err || !result) return res.sendResult(null, 400, 'this uid does not exist');
            // check if this goods is in the cart
            let inCart = false;
            result.cart.forEach((item) => {
                if (item.goodsId == gid) {
                    inCart = true;
                    item.goodsNum = num;
                    return;
                }
            });
            // not found
            if (!inCart) return res.sendResult(null, 400, 'this gid does not exist in cart');
            await result.save();
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
                { $match: { _id: mongoose.Types.ObjectId(uid) } }
            ]);
            res.sendResult(detailedUser[0], 200, 'edit number of goods successfully');
        });
    })
    .delete((req, res) => {
        const continueFlag = auth(req, res, ['normal']);
        if (continueFlag != 'ok') return;

        let { uid, gid } = req.params;
        // verify params
        Customer.findOne({ _id: uid }, async function(err, result) {
            if (err || !result) return res.sendResult(null, 400, 'this uid does not exist');
            // check if this goods is in the cart
            let inCart = false;
            result.cart.forEach((item) => {
                if (item.goodsId == gid) {
                    inCart = true;
                    return;
                }
            });
            // not found
            if (!inCart) return res.sendResult(null, 400, 'this gid does not exist in cart');
            // delete
            await Customer.updateOne({ _id: uid }, {
                $pull: {
                    cart: { goodsId: gid }
                }
            });
            // prepare return data
            let user = await Customer.findOne({ _id: uid }).lean();
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
                    { $match: { _id: mongoose.Types.ObjectId(uid) } }
                ]);
                user.cart = detailedUser[0].cart;
            }
            res.sendResult(user, 200, 'delete goods successfully');
        });
    });


module.exports = router;
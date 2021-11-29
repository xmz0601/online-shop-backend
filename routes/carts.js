const express = require('express');
const { Good } = require('../models/good');
const { Customer } = require('../models/customer');
const auth = require('../modules/authorization');

const router = express.Router();

router.route('/:uid/goods/:gid')
    // add goods to cart
    .post((req, res) => {
        auth(req, res, ['normal']);
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
                res.sendResult(cresult, 201, 'add goods to cart successfully');
            });
        });
    })
    // change number of goods in cart
    .put((req, res) => {
        auth(req, res, ['normal']);
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
            res.sendResult(result, 200, 'edit number of goods successfully');
        });
    })
    .delete((req, res) => {
        auth(req, res, ['normal']);
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
            res.sendResult(null, 200, 'delete goods successfully');
        });
    });


module.exports = router;
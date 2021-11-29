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
    });


module.exports = router;
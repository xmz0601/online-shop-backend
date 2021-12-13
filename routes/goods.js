const express = require('express');
const { Good, validateGoods, putGoodsValidate } = require('../models/good');
const { Category } = require('../models/category');
const auth = require('../modules/authorization');

const router = express.Router();

router.route('/')
    // get goods list
    .get(async(req, res) => {
        let { pagenum, pagesize, cid } = req.query;
        // verify params
        if (!pagenum || pagenum <= 0) return res.sendResult(null, 400, "wrong param: pagenum");
        if (!pagesize || pagesize <= 0) return res.sendResult(null, 400, "wrong param: pagesize");

        pagenum = parseInt(pagenum);
        pagesize = parseInt(pagesize);
        let skipCount = (pagenum - 1) * pagesize;
        let totalCount = 0;
        let goods = [];
        let resultData = {};
        resultData.pagenum = pagenum;

        if (cid) {
            // check if this category id exists
            Category.findOne({ _id: cid }, async function(err, result) {
                if (err || !result) return res.sendResult(null, 400, 'this cid does not exist');
                // query goods by category
                let clevel = result.cate_level;
                if (clevel == 0) {
                    totalCount = await Good.countDocuments({ cate_one_id: cid });
                    goods = await Good.find({ cate_one_id: cid }).limit(pagesize).skip(skipCount).sort({ price: 1 });
                } else if (clevel == 1) {
                    totalCount = await Good.countDocuments({ cate_two_id: cid });
                    goods = await Good.find({ cate_two_id: cid }).limit(pagesize).skip(skipCount).sort({ price: 1 });
                } else {
                    totalCount = await Good.countDocuments({ cate_three_id: cid });
                    goods = await Good.find({ cate_three_id: cid }).limit(pagesize).skip(skipCount).sort({ price: 1 });
                }
                resultData.totalCount = totalCount;
                resultData.totalPages = Math.ceil(totalCount / pagesize);
                resultData.goods = goods;
                res.sendResult(resultData, 200, 'get goods list successfully');
            });
        } else {
            // query goods by key words
            let key = req.query.query.trim();
            if (!key) {
                totalCount = await Good.countDocuments({});
                goods = await Good.find({}).limit(pagesize).skip(skipCount);
            } else {
                let keyArr = key.split(/\s+/);
                let regExp = '^';
                keyArr.forEach(el => {
                    regExp += '(?=.*' + el + ')';
                });
                totalCount = await Good.countDocuments({ name: { $regex: regExp, $options: 'ims' } });
                goods = await Good.find({ name: { $regex: regExp, $options: 'ims' } }).limit(pagesize).skip(skipCount);
            }
            resultData.totalCount = totalCount;
            resultData.totalPages = Math.ceil(totalCount / pagesize);
            resultData.goods = goods;
            res.sendResult(resultData, 200, 'get goods list successfully');
        }
    })
    .post((req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        // verify params
        const { error } = validateGoods(req.body);
        if (error) return res.sendResult(null, 400, error.message);

        // check if cate_id is valid
        Category.findOne({
            cate_level: 0,
            _id: req.body.cate_one_id.trim()
        }, function(err, result) {
            if (err || !result) return res.sendResult(null, 400, 'cate_one_id does not exist');

            Category.findOne({
                cate_level: 1,
                _id: req.body.cate_two_id.trim(),
                cate_pid: req.body.cate_one_id.trim()
            }, function(err, result) {
                if (err || !result) return res.sendResult(null, 400, 'cate_two_id does not exist');

                Category.findOne({
                    cate_level: 2,
                    _id: req.body.cate_three_id.trim(),
                    cate_pid: req.body.cate_two_id.trim()
                }, async function(err, result) {
                    if (err || !result) return res.sendResult(null, 400, 'cate_three_id does not exist');

                    // add to db
                    let resultData = await Good.create(req.body);
                    res.sendResult(resultData, 201, 'create goods successfully');
                });
            });
        });
    });


router.route('/:id')
    .get((req, res) => {
        let { id } = req.params;
        Good.findOne({ _id: id }, async function(err, result) {
            if (err || !result) return res.sendResult(null, 400, 'this id does not exist');
            res.sendResult(result, 200, 'query goods successfully');
        });
    })
    .put((req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        // verify params
        const { error } = putGoodsValidate(req.body);
        if (error) return res.sendResult(null, 400, error.message);
        let { id } = req.params;
        let bodyParams = req.body;
        // check if this id exists
        Good.findOne({ _id: id }, async function(err, result) {
            if (err || !result) return res.sendResult(null, 400, 'this id does not exist');
            // update
            await Good.updateOne({ _id: id }, bodyParams);
            let newGoods = await Good.findOne({ _id: id });
            res.sendResult(newGoods, 200, 'update goods successfully');
        });
    })
    .delete((req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        let { id } = req.params;
        Good.findOne({ _id: id }, async function(err, result) {
            if (err || !result) return res.sendResult(null, 400, 'this id does not exist');
            // delete
            await Good.deleteOne({ _id: id });
            res.sendResult(null, 200, 'delete goods successfully');
        });
    });


module.exports = router;
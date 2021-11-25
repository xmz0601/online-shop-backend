const express = require('express');
const { Good, validateGoods, putGoodsValidate } = require('../models/good');
const { Category } = require('../models/category');
const auth = require('../modules/authorization');

const router = express.Router();

router.route('/')
    // get goods list
    .get(async(req, res) => {
        // verify params
        if (!req.query.pagenum || req.query.pagenum <= 0) return res.sendResult(null, 400, "wrong param: pagenum");
        if (!req.query.pagesize || req.query.pagesize <= 0) return res.sendResult(null, 400, "wrong param: pagesize");

        let pagenum = parseInt(req.query.pagenum);
        let pagesize = parseInt(req.query.pagesize);
        let totalCount = await Good.countDocuments({});
        let totalPages = Math.ceil(totalCount / pagesize);
        let skipCount = (pagenum - 1) * pagesize;

        let goods = [];
        let key = req.query.query.trim();
        if (!key) {
            goods = await Good.find({}).limit(pagesize).skip(skipCount);
        } else {
            let keyArr = key.split(/\s+/);
            let regExp = '^';
            keyArr.forEach(el => {
                regExp += '(?=.*' + el + ')';
            });
            // recount
            totalCount = await Good.countDocuments({ name: { $regex: regExp, $options: 'ims' } });
            totalPages = Math.ceil(totalCount / pagesize);
            goods = await Good.find({ name: { $regex: regExp, $options: 'ims' } }).limit(pagesize).skip(skipCount);
        }

        let resultData = {};
        resultData.totalCount = totalCount;
        resultData.totalPages = totalPages;
        resultData.pagenum = pagenum;
        resultData.goods = goods;
        res.sendResult(resultData, 200, 'get goods list successfully');
    })
    .post((req, res) => {
        auth(req, res, ['admin']);
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
        auth(req, res, ['admin']);
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
        auth(req, res, ['admin']);
        let { id } = req.params;
        Good.findOne({ _id: id }, async function(err, result) {
            if (err || !result) return res.sendResult(null, 400, 'this id does not exist');
            // delete
            await Good.deleteOne({ _id: id });
            res.sendResult(null, 200, 'delete goods successfully');
        });
    });


module.exports = router;
const express = require('express');
const { Good } = require('../models/good');
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
    });


module.exports = router;
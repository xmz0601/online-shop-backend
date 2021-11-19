const express = require('express');
const auth = require('../modules/authorization');
const { Category } = require('../models/category');

const router = express.Router();


router.route('/')
    // get cate list
    .get(async(req, res) => {
        // verify params
        if (!req.query.pagenum || req.query.pagenum <= 0) return res.sendResult(null, 400, "wrong param: pagenum");
        if (!req.query.pagesize || req.query.pagesize <= 0) return res.sendResult(null, 400, "wrong param: pagesize");

        let level = '';
        if (!req.query.level) {
            level = '3';
        } else if (req.query.level != '1' && req.query.level != '2' && req.query.level != '3') {
            return res.sendResult(null, 400, "wrong param: level");
        } else {
            level = req.query.level;
        }

        let pagenum = parseInt(req.query.pagenum);
        let pagesize = parseInt(req.query.pagesize);
        let totalCount = await Category.countDocuments({ cate_pid: '0' });
        let totalPages = Math.ceil(totalCount / pagesize);
        let skipCount = (pagenum - 1) * pagesize;

        // get tier 1 category
        let cates = await Category.find({ cate_pid: '0' }).limit(pagesize).skip(skipCount).lean();
        if (level > 1) {
            for (let i = 0; i < cates.length; i++) {
                cates[i].children = await Category.find({ cate_pid: cates[i]._id }).lean();

                if (level > 2) {
                    for (let j = 0; j < cates[i].children.length; j++) {
                        cates[i].children[j].children = await Category.find({ cate_pid: cates[i].children[j]._id }).lean();
                    }
                }
            }
        }

        let resultData = {};
        resultData.totalCount = totalCount;
        resultData.totalPages = totalPages;
        resultData.pagenum = pagenum;
        resultData.cates = cates;

        res.sendResult(resultData, 200, 'get category list successfully');
    });



module.exports = router;
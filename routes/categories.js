const express = require('express');
const auth = require('../modules/authorization');
const { Category } = require('../models/category');

const router = express.Router();


router.route('/')
    // get cate list
    .get(async(req, res) => {
        // verify params
        let level = '';
        if (!req.query.level) {
            level = '3';
        } else if (req.query.level != '1' && req.query.level != '2' && req.query.level != '3') {
            return res.sendResult(null, 400, "wrong param: level");
        } else {
            level = req.query.level;
        }

        let pagenum = req.query.pagenum;
        let pagesize = req.query.pagesize;
        if (!pagenum && !pagesize) {
            // get all categories
            // get tier 1 category
            let cates = await Category.find({ cate_pid: '0' }).lean();
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
            return res.sendResult(cates, 200, 'get category list successfully');
        } else if (pagenum && pagenum > 0 && pagesize && pagesize > 0) {
            // get part of categories
            pagenum = parseInt(pagenum);
            pagesize = parseInt(pagesize);
            let totalCount = await Category.countDocuments({ cate_pid: '0' });
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
            resultData.pagenum = pagenum;
            resultData.cates = cates;
            return res.sendResult(resultData, 200, 'get category list successfully');
        }
        res.sendResult(null, 400, "wrong param: pagenum or pagesize");
    })
    .post(async(req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        let cate_pid = req.body.cate_pid + '';
        let cate_name = req.body.cate_name;
        let cate_level = req.body.cate_level + '';
        // verify params
        if (!cate_pid.trim()) return res.sendResult(null, 400, 'cate_pid is required');
        if (!cate_name.trim()) return res.sendResult(null, 400, 'cate_name is required');
        if (!cate_level.trim()) return res.sendResult(null, 400, 'cate_level is required');
        if (cate_level != '0' && cate_level != '1' && cate_level != '2') return res.sendResult(null, 400, 'wrong param: cate_level');

        // verify cate_pid
        if (cate_level == '0') {
            // cate_pid must be 0
            if (cate_pid != '0') return res.sendResult(null, 400, 'wrong param: cate_pid');
            let resultData = await Category.create(req.body);
            res.sendResult(resultData, 201, 'create category successfully');
        } else if (cate_level == '1') {
            // cate_pid must be tier 1 category's _id
            Category.findOne({ cate_level: 0, _id: cate_pid }, async function(err, result) {
                if (err || !result) return res.sendResult(null, 400, 'this pid does not exist');
                let resultData = await Category.create(req.body);
                res.sendResult(resultData, 201, 'create category successfully');
            });
        } else {
            // cate_pid must be tier 2 category's _id
            Category.findOne({ cate_level: 1, _id: cate_pid }, async function(err, result) {
                if (err || !result) return res.sendResult(null, 400, 'this pid does not exist');
                let resultData = await Category.create(req.body);
                res.sendResult(resultData, 201, 'create category successfully');
            });
        }
    });


router.route('/:id')
    .get((req, res) => {
        let { id } = req.params;
        Category.findOne({ _id: id }, async function(err, result) {
            if (err || !result) return res.sendResult(null, 400, 'this id does not exist');
            res.sendResult(result, 200, 'query category successfully');
        });
    })
    .put((req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        let id = req.params.id;
        // verify params
        if (!req.body.cate_name.trim()) return res.sendResult(null, 400, 'cate_name is required');
        // check if this id exists
        Category.findOne({ _id: id }, async function(err, result) {
            if (err || !result) return res.sendResult(null, 400, 'this id does not exist');
            // update
            await Category.updateOne({ _id: id }, { cate_name: req.body.cate_name });
            let newCate = await Category.findOne({ _id: id });
            res.sendResult(newCate, 200, 'update category successfully');
        });
    })
    .delete((req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        let { id } = req.params;
        Category.findOne({ _id: id }, async function(err, result) {
            if (err || !result) return res.sendResult(null, 400, 'this id does not exist');
            // delete
            let level = result.cate_level;
            let childCate = [];
            await Category.deleteOne({ _id: id });
            if (level < 2) {
                // level: 0/1, which means the deleted category has child or grandchild category
                childCate = await Category.find({ cate_pid: id });
                await Category.deleteMany({ cate_pid: id });
            }
            if (level < 1) {
                for (let i = 0; i < childCate.length; i++) {
                    await Category.deleteMany({ cate_pid: childCate[i]._id });
                }
            }
            res.sendResult(null, 200, 'delete category successfully');
        });
    });



module.exports = router;
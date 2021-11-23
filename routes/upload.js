const express = require('express');
const formidable = require('formidable');
const path = require('path');
const auth = require('../modules/authorization');

const router = express.Router();

router.route('/')
    // upload files
    .post((req, res) => {
        auth(req, res, ['admin']);
        const options = {
            keepExtensions: true,
            uploadDir: path.join(__dirname, '../', 'uploads')
        };
        const form = formidable(options);
        form.parse(req, (err, fields, files) => {
            if (err) return res.sendResult(null, 400, 'upload picture unsuccessfully');
            let resultData = {};
            resultData.img_path = files.file.filepath.split('online-shop-backend')[1];
            resultData.url = 'http://127.0.0.1:3000' + files.file.filepath.split('online-shop-backend')[1];
            res.sendResult(resultData, 200, 'upload picture successfully');
        });
    });



module.exports = router;
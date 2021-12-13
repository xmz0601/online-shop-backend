module.exports = async(req, res, model) => {
    // verify params
    if (!req.query.pagenum || req.query.pagenum <= 0) return res.sendResult(null, 400, "wrong param: pagenum");
    if (!req.query.pagesize || req.query.pagesize <= 0) return res.sendResult(null, 400, "wrong param: pagesize");

    let pagenum = parseInt(req.query.pagenum);
    let pagesize = parseInt(req.query.pagesize);
    let totalCount = await model.countDocuments({});
    let skipCount = (pagenum - 1) * pagesize;

    let users = [];
    let key = req.query.query.trim();
    if (!key) {
        users = await model.find({}).limit(pagesize).skip(skipCount);
    } else {
        let keyArr = key.split(/\s+/);
        let regExp = '^';
        keyArr.forEach(el => {
            regExp += '(?=.*' + el + ')';
        });
        // recount
        totalCount = await model.countDocuments({ username: { $regex: regExp, $options: 'ims' } });
        users = await model.find({ username: { $regex: regExp, $options: 'ims' } }).limit(pagesize).skip(skipCount);
    }

    let resultData = {};
    resultData.totalCount = totalCount;
    resultData.totalPages = Math.ceil(totalCount / pagesize);
    resultData.pagenum = pagenum;
    resultData.users = users;

    res.sendResult(resultData, 200, 'get users list successfully');
};
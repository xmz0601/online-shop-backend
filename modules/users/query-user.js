module.exports = (req, res, model) => {
    let { id } = req.params;

    model.findOne({ _id: id }, async function(err, result) {
        if (err || !result) return res.sendResult(null, 400, 'this id does not exist');
        res.sendResult(result, 200, 'query user successfully');
    });
};
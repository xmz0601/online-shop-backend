module.exports = (req, res, model) => {
    let { id } = req.params;
    let bodyParams = req.body;
    // check if this id exists
    model.findOne({ _id: id }, async function(err, result) {
        if (err || !result) return res.sendResult(null, 400, 'this id does not exist');

        // update
        await model.updateOne({ _id: id }, bodyParams);
        let newUser = await model.findOne({ _id: id });
        res.sendResult(newUser, 200, 'update user successfully');
    });
};
module.exports = (req, res, model) => {
    let { id, state } = req.params;

    // verify params
    if (state != '0' && state != '1') return res.sendResult(null, 400, "wrong param: state");
    // check if this id exists
    model.findOne({ _id: id }, async function(err, result) {
        if (err || !result) return res.sendResult(null, 400, 'this id does not exist');

        // update
        await model.updateOne({ _id: id }, { state });
        let newUser = await model.findOne({ _id: id });
        res.sendResult(newUser, 200, 'change user state successfully');
    });
};
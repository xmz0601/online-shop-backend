const mongoose = require('mongoose');
const Joi = require('joi');

// set schema
const goodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    weight: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cate_one_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    cate_two_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    cate_three_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    create_time: {
        type: Date,
        default: Date.now
    },
    pic: {
        type: String,
        trim: true,
        default: ''
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    ingredients: {
        type: String,
        trim: true,
        default: ''
    },
    storage: {
        type: String,
        trim: true,
        default: ''
    }
});

// create collection
const Good = mongoose.model('Good', goodSchema);

// init a category
function createGood() {
    Good.create({
        name: "Kellogg's Rice Krispies",
        weight: '510',
        price: '2.90',
        cate_one_id: '61967cbf8414d8108c52ba32',
        cate_two_id: '619683d96cb3b619e476b8b4',
        cate_three_id: '619694214b23b13042de1105'
    });
}
// createGood();

const validateGoods = (goods) => {
    const schema = Joi.object({
        name: Joi.string().trim().required(),
        weight: Joi.number().positive().required(),
        price: Joi.number().positive().required(),
        cate_one_id: Joi.string().trim().required(),
        cate_two_id: Joi.string().trim().required(),
        cate_three_id: Joi.string().trim().required(),
        pic: Joi.string().trim().allow(null, ''),
        description: Joi.string().trim().allow(null, ''),
        ingredients: Joi.string().trim().allow(null, ''),
        storage: Joi.string().trim().allow(null, '')
    });
    return schema.validate(goods);
};


module.exports = {
    Good,
    validateGoods
};
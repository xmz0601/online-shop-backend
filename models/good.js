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

module.exports = {
    Good
};
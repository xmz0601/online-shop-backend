const mongoose = require('mongoose');
const Joi = require('joi');

// set schema
const cateSchema = new mongoose.Schema({
    cate_name: {
        type: String,
        required: true,
        trim: true
    },
    cate_level: {
        type: Number,
        required: true,
        trim: true
    },
    cate_pid: {
        type: String,
        required: true,
        trim: true
    },
    create_time: {
        type: Date,
        default: Date.now
    }
});

// create collection
const Category = mongoose.model('Category', cateSchema);

// init a category
function createCate() {
    Category.create({
        cate_name: 'Odour Control',
        cate_level: 2,
        cate_pid: '61968df1bd315427711edf33'
    });
}
// createCate();


module.exports = {
    Category
};
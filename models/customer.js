const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');

// set schema
const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 10,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    post_code: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    town_city: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: 'normal'
    },
    // 0-disable
    state: {
        type: Number,
        default: 1
    },
    create_time: {
        type: Date,
        default: Date.now
    },
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        productNum: Number,
        isChecked: Boolean
    }]
});

// create collection
const Customer = mongoose.model('Customer', customerSchema);

// init a  customer to verify login function
async function createCustomer() {
    let salt = await bcrypt.genSalt(10);
    let pwd = await bcrypt.hash('123456', salt);
    Customer.create({
        username: 'ivy',
        password: pwd,
        email: 'ivy@gmail.com',
        post_code: 'CB3 1AS',
        address: '32 Oxford Road',
        town_city: 'Cambridge'
    });
}
// createCustomer();

// this function will return an obj
const validateCustm = (custm) => {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(10).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().trim().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
        post_code: Joi.string().trim().pattern(new RegExp(/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/)).required(),
        address: Joi.string().trim().required(),
        town_city: Joi.string().trim().required()
    });
    return schema.validate(custm);
};

module.exports = {
    Customer,
    validateCustm
};
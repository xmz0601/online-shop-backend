const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');

// set schema
const customerSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 10,
        trim: true
    },
    last_name: {
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
        first_name: 'Rob',
        last_name: 'Stark',
        password: pwd,
        email: 'rob@gmail.com',
        post_code: 'CB3 1AA',
        address: '12 Oxford Road',
        town_city: 'Cambridge'
    });
}
// createCustomer();

module.exports = {
    Customer
};
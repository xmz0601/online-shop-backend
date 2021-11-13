const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('joi');

// set schema
const staffSchema = new mongoose.Schema({
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
    // admin
    role: {
        type: String,
        default: 'admin'
    },
    // 0-disable
    state: {
        type: Number,
        default: 1
    },
    create_time: {
        type: Date,
        default: Date.now
    }
});

// create collection
const Staff = mongoose.model('Staff', staffSchema);

// init a staff to verify login function
async function createStaff() {
    let salt = await bcrypt.genSalt(10);
    let pwd = await bcrypt.hash('123456', salt);
    Staff.create({
        username: 'lily',
        password: pwd,
        email: 'lily@gmail.com',
        state: 1
    });
}
// createStaff();

module.exports = {
    Staff
};
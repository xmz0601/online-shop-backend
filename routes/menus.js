const express = require('express');
const auth = require('../modules/authorization');

const router = express.Router();

router.route('/')
    // get menu list
    .get((req, res) => {
        auth(req, res, ['admin']);
        const menuList = [{
            id: 100,
            authName: 'User Management',
            path: 'users',
            children: [{
                    id: 101,
                    authName: 'Staff List',
                    path: 'staffs',
                    children: []
                },
                {
                    id: 102,
                    authName: 'Customer List',
                    path: 'customers',
                    children: []
                }
            ]
        }, {
            id: 200,
            authName: 'Goods Management',
            path: 'goods',
            children: [{
                id: 201,
                authName: 'Goods List',
                path: 'goods',
                children: []
            }]
        }, {
            id: 300,
            authName: 'Category Management',
            path: 'categories',
            children: [{
                id: 301,
                authName: 'Category List',
                path: 'categories',
                children: []
            }]
        }, {
            id: 400,
            authName: 'Data Management',
            path: 'data',
            children: [{
                id: 401,
                authName: 'Statistical Report',
                path: 'reports',
                children: []
            }]
        }];
        res.sendResult(menuList, 200, 'get menu list successfully');
    });


module.exports = router;
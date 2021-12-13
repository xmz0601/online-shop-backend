const express = require('express');
const auth = require('../modules/authorization');

const router = express.Router();

router.route('/')
    // get menu list
    .get((req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        const menuList = [{
            id: 100,
            authName: 'User',
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
            authName: 'Category',
            path: 'categories',
            children: [{
                id: 201,
                authName: 'Category List',
                path: 'categories',
                children: []
            }]
        }, {
            id: 300,
            authName: 'Goods',
            path: 'goods',
            children: [{
                id: 301,
                authName: 'Goods List',
                path: 'goods',
                children: []
            }]
        }, {
            id: 400,
            authName: 'Data',
            path: 'data',
            children: [{
                id: 401,
                authName: 'Data Report',
                path: 'reports',
                children: []
            }]
        }];
        res.sendResult(menuList, 200, 'get menu list successfully');
    });


module.exports = router;
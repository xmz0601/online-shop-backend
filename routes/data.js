const express = require('express');
const auth = require('../modules/authorization');

const router = express.Router();

router.route('/reports/:type')
    .get((req, res) => {
        const continueFlag = auth(req, res, ['admin']);
        if (continueFlag != 'ok') return;

        // verify params
        let { type } = req.params;
        if (type != 1) return res.sendResult(null, 400, 'wrong param: type');

        const reports = {
            legend: {
                data: ['East', 'South', 'North', 'West', 'Others']
            },
            yAxis: [{ type: 'value' }],
            xAxis: [{
                data: ['2021-06', '2021-07', '2021-08', '2021-09', '2021-10', '2021-11'],
                boundaryGap: false
            }],
            series: [{
                    name: 'East',
                    type: 'line',
                    stack: 'total number',
                    areaStyle: { normal: {} },
                    data: [2999, 3111, 4100, 3565, 3528, 6000]
                },
                {
                    name: 'South',
                    type: 'line',
                    stack: 'total number',
                    areaStyle: { normal: {} },
                    data: [5090, 2500, 3400, 6000, 6400, 7800]
                },
                {
                    name: 'North',
                    type: 'line',
                    stack: 'total number',
                    areaStyle: { normal: {} },
                    data: [6888, 4000, 8010, 12321, 13928, 12984]
                },
                {
                    name: 'West',
                    type: 'line',
                    stack: 'total number',
                    areaStyle: { normal: {} },
                    data: [9991, 4130, 7777, 12903, 13098, 14028]
                },
                {
                    name: 'Others',
                    type: 'line',
                    stack: 'total number',
                    areaStyle: { normal: {} },
                    data: [15212, 5800, 10241, 14821, 15982, 14091]
                }
            ],
            title: { text: 'User Source' },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    label: { backgroundColor: '#E9EEF3' },
                    type: 'cross'
                }
            }
        };
        res.sendResult(reports, 200, 'get report successfully');
    });


module.exports = router;
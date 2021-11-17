const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// connect to database
require('./modules/database');
// require('./models/staff')
// require('./models/customer')

// parse request bodies
app.use(bodyParser.json());
// use querystring
app.use(bodyParser.urlencoded({ extended: false }));

// cors settings
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Role')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With')
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1');
    // 让options请求快速返回
    if (req.method == 'OPTIONS') res.send(200);
    else next();
});

// add a uniform response handler
const resextra = require('./modules/resextra');
app.use(resextra);

// require router
app.use('/clogin', require('./routes/login/custm-login'));
app.use('/slogin', require('./routes/login/staff-login'));
app.use('/staffs', require('./routes/staffs'));
app.use('/customers', require('./routes/customers'));


app.listen(3000, () => {
    console.log('server is running...');
});
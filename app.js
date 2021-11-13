const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// connect to database
require('./modules/database.js');
// require('./models/staff.js')
// require('./models/customer.js')

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
const resextra = require('./modules/resextra.js');
app.use(resextra);

// require router
const router = require('./routes/index.js');
app.use(router);


app.listen(3000, () => {
    console.log('server is running...');
});
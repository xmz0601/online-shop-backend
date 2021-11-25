const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// connect to database
require('./modules/database');
// require('./models/staff');
// require('./models/customer');
// require('./models/category');
require('./models/good');

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
    // let options requests return quickly
    if (req.method == 'OPTIONS') res.send(200);
    else next();
});

// manage static resources
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// add a uniform response handler
const resextra = require('./modules/resextra');
app.use(resextra);

// require router
app.use('/clogin', require('./routes/login/custm-login'));
app.use('/slogin', require('./routes/login/staff-login'));
app.use('/staffs', require('./routes/staffs'));
app.use('/customers', require('./routes/customers'));
app.use('/menus', require('./routes/menus'));
app.use('/categories', require('./routes/categories'));
app.use('/upload', require('./routes/upload'));
app.use('/goods', require('./routes/goods'));


app.listen(3000, () => {
    console.log('server is running...');
});
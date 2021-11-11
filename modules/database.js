const mongoose = require('mongoose');
const config = require('config');

// connect to database
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => { console.log('connect to database successfully'); })
    .catch(err => {
        console.log('connection to database failed');
        console.log(err);
    });
    
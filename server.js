const { app } = require('./app');
const { db } = require('./utils/database_util');
const { relateModels } = require('./models/relations.model');
require('dotenv').config();

db.authenticate()
.then(() => console.log('database is authenticated'))
.catch(err => console.log(err));

relateModels();

db.sync()
    .then(() => console.log('database is synced'))
    .catch(err => console.log(err));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`server listen on port ${process.env.SERVER_PORT}`)
});
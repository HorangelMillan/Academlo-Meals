const { app } = require('./app');
const { db } = require('./utils/database_util');
require('dotenv').config();

// models
const { Users } = require('./models/users.model');
const { Orders } = require('./models/orders.model');
const { Reviews } = require('./models/reviews.model');
const { Restaurants } = require('./models/restaurants.model');
const { Meals } = require('./models/meals.model');

// models relation
Users.hasMany(Orders, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
});
Orders.belongsTo(Users);

Users.hasMany(Reviews, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
});
Reviews.belongsTo(Users);

Restaurants.hasMany(Reviews, {
    foreignKey: {
        name: 'restaurantId',
        allowNull: false
    }
});
Reviews.belongsTo(Restaurants);

Restaurants.hasMany(Meals, {
    foreignKey: {
        name: 'restaurantId',
        allowNull: false
    }
});
Meals.belongsTo(Restaurants);

Meals.hasOne(Orders, {
    foreignKey: {
        name: 'mealId',
        allowNull: false
    }
});
Orders.belongsTo(Meals);

db.sync()
    .then(() => console.log('database is synced'))
    .catch(err => console.log(err));

db.authenticate()
    .then(() => console.log('database is authenticated'))
    .catch(err => console.log(err));

app.listen(process.env.SERVER_PORT, () => {
    console.log(`server listen on port ${process.env.SERVER_PORT}`)
});
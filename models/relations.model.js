// models
const { Users } = require('./users.model');
const { Orders } = require('./orders.model');
const { Reviews } = require('./reviews.model');
const { Restaurants } = require('./restaurants.model');
const { Meals } = require('./meals.model');

const relateModels = () => {

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

};

module.exports = { relateModels };
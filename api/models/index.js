const Sequelize = require('sequelize')

const { MYSQL } = require('../config/credentials');

const {
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME
} = MYSQL

const sequelize = new Sequelize(
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    {
        host: DB_HOST,
        dialect: 'mysql',
        port: 3306,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        }
    }
);

sequelize
    .authenticate()
    .then(async function(err) {
        console.log('Connection has been established successfully.');
        await db.sequelize.sync({ force:true });
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

const db = {
    sequelize,
    models: {
        Allocation: require('./Allocation')(sequelize),
        Client: require('./Client')(sequelize),
        Contributor: require('./Contributor')(sequelize),
        Issue: require('./Issue')(sequelize),
        Payment: require('./Payment')(sequelize),
        Project: require('./Project')(sequelize),
        Rate: require('./Rate')(sequelize),
        TimeEntry: require('./TimeEntry')(sequelize),
    }
};

module.exports = db;

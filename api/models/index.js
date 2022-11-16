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
        },
        logging: false
    }
);

sequelize
    .authenticate()
    .then(async function(err) {
        await db.sequelize.sync()
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

const db = {
    sequelize,
    models: {
        Allocation: require('./Allocation')(sequelize),
        Client: require('./Client')(sequelize),
        Contribution: require('./Contribution')(sequelize),
        Contributor: require('./Contributor')(sequelize),
        Issue: require('./Issue')(sequelize),
        Payment: require('./Payment')(sequelize),
        Permission: require('./Permission')(sequelize),
        Phase: require('./Phase')(sequelize),
        Project: require('./Project')(sequelize),
        Rate: require('./Rate')(sequelize),
        Role: require('./Role')(sequelize),
        TimeEntry: require('./TimeEntry')(sequelize),
        Wallet: require('./Wallet')(sequelize)
    }
};

//Associations
const associations = ({ 
    Allocation, 
    Client, 
    Contribution,
    Contributor, 
    Issue, 
    Payment, 
    Permission,
    Phase, 
    Project, 
    Rate,
    Role,
    TimeEntry,
    Wallet
}) => {
    Client.hasMany(Payment, { foreignKey: 'client_id' });
    Client.hasMany(Permission, { foreignKey: 'client_id' })
    Client.hasMany(Project, { foreignKey: 'client_id' })
    Contribution.belongsTo(Contributor, { foreignKey: 'contributor_id' })
    Contribution.belongsTo(Issue, { foreignKey: 'issue_id' })
    Contributor.hasMany(Allocation, { foreignKey: 'contributor_id' })
    Contributor.hasMany(Permission, { foreignKey: 'contributor_id' })
    Contributor.hasMany(TimeEntry, { foreignKey: 'contributor_id' })
    Contributor.hasOne(Wallet, { foreignKey: 'contributor_id' })
    Issue.belongsTo(Project, { foreignKey: 'project_id' })
    Payment.hasMany(Allocation, { foreignKey: 'payment_id' })
    Project.hasMany(Allocation, { foreignKey: 'project_id' })
    Project.hasMany(Permission, { foreignKey: 'project_id' })
    Project.hasMany(Phase, { foreignKey: 'project_id' })
    Project.hasMany(TimeEntry, { foreignKey: 'project_id' })
    Rate.hasMany(Allocation, { foreignKey: 'rate_id' })
    Rate.belongsTo(Contributor, { foreignKey: 'contributor_id' })
    Role.hasMany(Rate, { foreignKey: 'role_id' })
}

associations(db.models)

module.exports = db;

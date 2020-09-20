const Sequelize = require('sequelize')
const  db  = require('../models/')

const sequelize = module.exports = (sequelize => {

    console.log('db.sequelize');

    // sequelize
    //     .authenticate()
    //     .then(async function(err) {
    //         console.log('Connection has been established successfully.');
    //         // await sequelize.sync({ force: true });
    //     })
    //     .catch(function (err) {
    //         console.log('Unable to connect to the database:', err);
    //     });

    const insertQuery = async () => {
        const client = await db.models.Client.create({
            is_active: true,
            name: 'SetLife',
            currency: '$',
            date_created: new Date()
        })

        console.log('client\'s auto-generated ID:', client.id);
        console.log(client.toJSON());
    }

    return {
        insertQuery
    }
})();
//
console.log('this.insertQuery()');
console.log(sequelize.insertQuery());

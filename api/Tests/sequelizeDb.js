const Sequelize = require('sequelize')
const  db  = require('../models/')

const sequelize = module.exports = (sequelize => {

    const insertQuery = () => {
        const client = db.models.Client.create(
            {
                is_active: 'true',
                name: 'SetLife',
                currency: '$',
                date_created: new Date()
            }
        );
        console.log('client\'s auto-generated ID:', client.id);
    }

    return {
        insertQuery
    }
})();
//
console.log('this.insertQuery()');
// console.log(sequelize.insertQuery());

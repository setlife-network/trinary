const Sequelize = require('sequelize')
const { Client } = require('../models/index')
const { insertQuery } = require('./sequelizeDb')

module.exports = (sequelize) => {

    const insertQuery = () => {
        const client = Client.create(
            {
                name: 'SetLife',
                is_active: 'true',
                currency: '$',
                dtae_created: new Date()
            }
        );
        console.log('client\'s auto-generated ID:', client.id);
    }

    return {
        insertQuery
    }
}
// 
// console.log('this.insertQuery()');
// console.log(insertQuery());

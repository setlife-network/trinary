const db = require('../models')

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
        const project = await db.models.Client.create({
            currency: '$',
            is_active: true,
            name: 'Tech Education',
            date_created: new Date()
        })

        console.log('project\'s auto-generated ID:', project.id);
        console.log(project.toJSON());
        console.log('Project');
        console.log(db.models.Project);

    }

    return {
        insertQuery
    }
})();
//
console.log('this.insertQuery()');
console.log(sequelize.insertQuery());

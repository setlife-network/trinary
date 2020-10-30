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

    const joinQuery = async () => {

        const test = await db.models.Contributor.findAll({
            raw: true,
            include: [
                {
                    model: db.models.Allocation,
                    attributes: [],
                    where: {
                        'project_id': 1
                    },
                    required: false,
                }
            ],

        })
        console.log('test');
        console.log(test);

        //console.log(test[0].Payments);
    }

    return {
        insertQuery,
        joinQuery
    }
})();
//
console.log('this.insertQuery()');
console.log(sequelize.joinQuery());

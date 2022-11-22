const { AuthenticationError } = require('apollo-server');
const Contribution = require('../../models/Contribution');
const projectId = require('../helpers/projectIdFetcher')

module.exports = {
    authorizedContributor: async (next, src, args, { models, cookies }, operation ) => {
        if (!cookies.userSession) {
            return new Error('User not logged in')
        }
        return next('abc');
    },
    authorizedProjectContributor: async (next, src, args, { models, cookies }, operation) => {
        //You get the contributor id of the contributor who needs access to that specific project. They are going to
        const contributor_id = cookies.userSession
        console.log(contributor_id)
        const { project_id } = (operation.variableValues)
        console.log(project_id)
        const permission = await models.Permission.findOne({ where: { project_id: project_id, contributor_id: contributor_id } })
        if (!permission) {
            return new Error('Contributor not authorized')
        }
        return next();
    },
    authorizedProjectAdmin: async (next, src, args, { models, cookies }, operation) => {

        const contributor_id = cookies.userSession
        console.log(contributor_id)
        const fieldName = operation.fieldName
        console.log(fieldName)
        const project_id = operation.fieldNodes[0].arguments[0].value.value
        // const project_id = operation.fieldNodes[0].arguments[0].value.value
        const permission = await models.Permission.findOne({ where: { project_id: project_id, contributor_id: contributor_id } })
        if (!permission) {
            return new Error('Contributor not authorized')
        } else if ( permission.dataValues.type != 'owner' ) {
            return new Error('Only Project Admin is authorized')
        }
        return next(); 
    },
}

const fetchProjectId = require('../helpers/projectIdFetcher')

module.exports = {
    authorizedContributor: async (next, src, args, { models, cookies }, operation ) => {
        if (!cookies.userSession) {
            return new Error('User not logged in')
        }
        return next();
    },
    authorizedProjectContributor: async (next, src, args, { models, cookies }, operation) => {
        //You get the contributor id of the contributor who needs access to that specific project
        const contributor_id = cookies.userSession
        const project_id = operation.fieldNodes[0].arguments[0].value.value
        console.log(contributor_id)
        console.log(project_id)
        const permission = await models.Permission.findOne({ where: { project_id: project_id, contributor_id: contributor_id } })
        if (!permission) {
            return new Error('Contributor not authorized')
        }
        return next();
    },
    authorizedProjectAdmin: async (next, src, args, { models, cookies }, operation) => {

        const contributor_id = cookies.userSession
        const fieldName = operation.fieldName
        const fieldId = operation.variableValues.id
        // const fieldId = operation.fieldNodes[0].arguments[0].value.value
        const project_id = fetchProjectId(fieldName, fieldId, operation)
        console.log(fieldName)
        console.log(project_id)
        console.log(contributor_id)
        const permission = await models.Permission.findOne({ where: { project_id: project_id, contributor_id: contributor_id } })
        if (!permission) {
            return new Error('Contributor not authorized')
        } else if ( permission.dataValues.type != 'owner' ) {
            return new Error('Only Project Admin is authorized')
        }
        return next(); 
    },
}

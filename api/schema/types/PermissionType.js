const { gql } = require('apollo-server')

module.exports = gql`

    type Permission {
        type: String!
        contributor_id: Int!
        contributor: Contributor!
        project_id: Int!
        project: Project!
    }
    type Query {
        getPermissions: [Permission]
        getPermissionsByProjectId(id: Int!): [Permission]
        getPermissionsByContributorId(id: Int!): [Permission]
        getPermissionByProjectIdAndContributorId(
            project_id: Int!,
            contributor_id: Int!
        ): Permission
    }

`

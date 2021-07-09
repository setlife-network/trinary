const { gql } = require('apollo-server')

module.exports = gql`

    type Permission {
        id: Int!
        type: String!
        contributor_id: Int!
        project_id: Int!
        contributor: Contributor!
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
    input CreatePermissionInput {
        contributor_id: Int!
        project_id: Int!
        type: String!
    }
    type Mutation {
        createPermission(createFields: CreatePermissionInput): Permission
        syncContributorsPermissions: Int
    }

`

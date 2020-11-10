const { gql } = require('apollo-server')

module.exports = gql`

    type Permission {
        type: String!
        project_id: Int!
        contributor_id: Int!
    }

`

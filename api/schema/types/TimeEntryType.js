const { gql } = require('apollo-server')

module.exports = gql`

    type TimeEntry {
        id: Int!
        seconds: Int!
        togglId: Int!
        startTime: String!
        contributor: Contributor!
        project: Project!
    }

    type Query {
        timeEntry(id: Int!): TimeEntry
        timeEntries: [TimeEntry]
        projectTimeEntries(projectId: Int!): [TimeEntry]
    }

    type Mutation {
        createTimeEntry(
            seconds: Int!,
            toggl_id: Int!,
            start_time: String!,
            contributor_id: Int!,
            project_id: Int!
        ): TimeEntry
    }

`

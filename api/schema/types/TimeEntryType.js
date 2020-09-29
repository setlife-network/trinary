const { gql } = require('apollo-server')

module.exports = gql`

    scalar Date

    type TimeEntry {
        id: Int!
        seconds: Int!
        togglId: Int!
        startTime: Date!
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
            start_time: Date!,
            contributor_id: Int!,
            project_id: Int!
        ): TimeEntry
    }

`

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
        getTimeEntry(id: Int!): TimeEntry
        getProjectTimeEntries(projectId: Int!): [TimeEntry]
    }

    type Mutation {
        createTimeEntry(
            seconds: Int!,
            togglId: Int!,
            startTime: Date!,
            contributorId: Int!,
            projectId: Project
        ): TimeEntry
    }

`

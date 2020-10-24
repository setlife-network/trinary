const { gql } = require('apollo-server')

module.exports = gql`

    type TimeEntry {
        id: Int!
        seconds: Int!
        toggl_id: Int!
        start_time: String!
        contributor_id: Int!
        project_id: Int!
        contributor: Contributor!
        project: Project!
    }

    input TimeEntryInput {
        seconds: Int,
        toggl_id: Int,
        contributor_id: Int,
        project_id: Int,
        start_time: String
    }

    type Query {
        getTimeEntryById(id: Int!): TimeEntry
        getTimeEntries: [TimeEntry]
        getProjectTimeEntriesByProjectId(project_id: Int!): [TimeEntry]
    }

    type Mutation {
        createTimeEntry(
            createFields: TimeEntryInput!
        ): TimeEntry

        deleteTimeEntryById(id: Int!): String

        upateTimeEntryById(
            id: Int!,
            updateFields: TimeEntryInput
        ): TimeEntry
    }

`

const { gql } = require('apollo-server')

module.exports = gql`

    type TimeEntry {
        id: Int!
        seconds: Int!
        toggl_id: Int!
        startTime: String!
        contributor_id: Int!
        project_id: Int!
        contributor: Contributor!
        project: Project!
    }

    input TimeEntryInput {
        seconds: Int!,
        toggl_id: Int!,
        contributor_id: Int!,
        project_id: Int!
    }

    type Query {
        getTimeEntryById(id: Int!): TimeEntry
        getTimeEntries: [TimeEntry]
        getProjectTimeEntriesByProjectId(projectId: Int!): [TimeEntry]
    }

    type Mutation {
        createTimeEntry(
            createFields: TimeEntryInput,
            start_time: String!
        ): TimeEntry
    }

`

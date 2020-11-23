const { gql } = require('apollo-server')

module.exports = gql`

    type Project {
        id: Int!
        expected_budget: Int!
        is_active: Boolean!
        name: String!
        github_url: String!
        toggl_url: String
        date: String!
        date_last_synced: String
        client_id: Int!
        toggl_id: String
        allocations: [Allocation]
        allocatedPayments: [Payment]
        averageHourlyPaid(fromDate: String, toDate: String): Int
        averageIssueCost(fromDate: String, toDate: String): AverageIssueCost
        client: Client
        contributors: [Contributor]
        githubContributors: [Contributor]
        issuesOpened(fromDate: String, toDate: String): Int
        issues: [Issue]
        permissions: [Permission]
        githubIssuesOpened(
            fromDate: String,
            toDate:String
        ): Int
        githubIssuesClosed(
            fromDate: String,
            toDate:String
        ): Int
        timeEntries(
            fromDate: String
            toDate: String
            contributor_id: Int
        ): [TimeEntry]
        timeSpent(
            fromDate: String!
            toDate: String!
            contributor_id: Int
        ): TimeSpent
        totalPaid(
            fromDate: String,
            toDate: String
        ): Int
    }

    type AverageIssueCost {
        fromPayments: Int
        fromAllocations: Int
    }

    type TimeSpent {
        seconds: Int
    }

    input CreateProjectInput {
        expected_budget: Int
        is_active: Boolean
        name: String
        github_url: String
        toggl_url: String
        client_id: Int
        date: String
    }

    input UpdateProjectInput {
        expected_budget: Int
        is_active: Boolean
        name: String
        github_url: String
        toggl_url: String
        client_id: Int
        toggl_id: String
        date: String
        date_last_synced:String
    }

    type Query {
        getProjectById(id: Int!): Project
        getProjects: [Project]
    }

    type Mutation {
        createProject(
            createFields: CreateProjectInput!
        ): Project
        deleteProjectById(id: Int!): String
        syncProjectPermissions(project_id: Int!):[Permission]
        syncTogglProject(
            project_id: Int!
            toggl_id: String
        ): Project
        syncProjectIssues(
            project_id: Int
        ): [Issue]
        updateProjectById(
            id: Int!
            updateFields: UpdateProjectInput!
        ): Project
    }

`

import { gql } from '@apollo/client';

export const GET_PROJECT_ISSUES = gql`
    query ProjectIssues($projectId: Int!) {
        getIssuesByProjectId(
            project_id: $projectId
        ) {
            id
            github_url
            date_opened
            date_closed
            project {
                github_url
            }
        }
    }
`

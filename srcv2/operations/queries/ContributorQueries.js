import { gql } from '@apollo/client'

export const CHECK_SESSION = gql`
    query CheckSession{
        checkSession {
            id
            name
            github_id
            github_handle
            github_access_token
            toggl_id
            external_data_url
        }
    }
`

export const GET_CONTRIBUTOR_ORGANIZATIONS_FROM_GITHUB = gql`
    query GithubOrganizations($id: Int) {
        getGithubOrganizations(contributorId: $id) {
            id
            avatar
            name
        }
    }
`

export const GET_CONTRIBUTOR_REPOS_FROM_GITHUB = gql`
    query GithubOrganizationRepos($githubPageNumber: Int!, $accountId: Int!) {
        getGithubRepos(
            githubPageNumber: $githubPageNumber, 
            accountId: $accountId 
        ) 
        {
            id
            name
            githubUrl
        }
    }
`
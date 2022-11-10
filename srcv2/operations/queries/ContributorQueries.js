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
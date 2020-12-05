import React from 'react'
import { gql, useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid'
import { orderBy } from 'lodash'

import { GET_POJECTS } from '../operations/queries/ProjectQueries'
import { GET_CLIENT_INFO } from '../operations/queries/ClientQueries'
import ProjectsList from './ProjectsList'

const ClientProjectsListManager = ({
    clientId,
    history
}) => {

    const { loading, error, data, networkStatus } = useQuery(GET_CLIENT_INFO, {
        variables: { id: parseInt(clientId, 10) }
    })

    if (loading) {
        return (
            <Grid item xs={12}>
                Loading...
            </Grid>
        )
    }
    if (error) return `Error! ${error.message}`;

    const projects = orderBy(data.getClientById.projects, ['is_active'], ['desc'])

    return (
        projects.length != 0
            ? (
                <ProjectsList
                    history={history}
                    projects={projects}
                />
            )
            : (
                //TODO: Create empty state
                <p>
                    No projects to display
                </p>
            )
    )
}

export default ClientProjectsListManager

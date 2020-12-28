import React from 'react'
import { gql, useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid'
import { orderBy } from 'lodash'

import { GET_CLIENT_INFO } from '../operations/queries/ClientQueries'
import ProjectsList from './ProjectsList'
import ProjectsEmptyState from './ProjectsEmptyState'

const ClientProjectsList = ({
    clientId,
    history
}) => {

    const { loading, error, data, networkStatus } = useQuery(GET_CLIENT_INFO, {
        variables: { id: Number(clientId) }
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
                <ProjectsEmptyState/>
            )
    )
}

export default ClientProjectsList

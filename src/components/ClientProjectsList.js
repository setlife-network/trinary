import React from 'react'
import { useQuery } from '@apollo/client'
import Grid from '@material-ui/core/Grid'
import { orderBy } from 'lodash'

import LoadingProgress from './LoadingProgress'
import ProjectsList from './ProjectsList'
import ProjectsEmptyState from './ProjectsEmptyState'
import { GET_CLIENT_INFO } from '../operations/queries/ClientQueries'

const ClientProjectsList = ({
    clientId,
    history
}) => {

    const { loading, error, data, networkStatus } = useQuery(GET_CLIENT_INFO, {
        variables: { id: Number(clientId) }
    })

    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${error.message}`

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

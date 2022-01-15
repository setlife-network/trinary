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

    const { loading, error, data } = useQuery(GET_CLIENT_INFO, {
        variables: { id: Number(clientId) },
        fetchPolicy: 'cache-and-network'
    })

    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${error.message}`

    const getActiveProjects = () => {
        const activeProjects = []
        data.getClientById.projects.map(p => {
            if (p.is_active) {
                activeProjects.push(p)
            }
        })
        return activeProjects
    }
    const projects = getActiveProjects()

    return (
        <Grid container>
            {
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
            }

        </Grid>
    )
}

export default ClientProjectsList

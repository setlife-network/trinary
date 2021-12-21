import React from 'react'
import { useQuery } from '@apollo/client'
import Grid from '@material-ui/core/Grid'
import { orderBy } from 'lodash'

import LoadingProgress from './LoadingProgress'
import ProjectsList from './ProjectsList'
import ProjectsEmptyState from './ProjectsEmptyState'
import { GET_CLIENT_INFO } from '../operations/queries/ClientQueries'

const ClientInactiveProjectLists = ({
    clientId,
    history
}) => {

    const { loading, error, data } = useQuery(GET_CLIENT_INFO, {
        fetchPolicy: 'cache-and-network',
        variables: { id: Number(clientId) }
    })

    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${error.message}`

    const getInactiveProjects = () => {
        const inactiveProjects = []
        data.getClientById.projects.map(p => {
            if (!p.is_active) {
                inactiveProjects.push(p)
            }
        })
        return inactiveProjects
    }
    const projects = getInactiveProjects()

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
                    : null
            }

        </Grid>
    )
}

export default ClientInactiveProjectLists

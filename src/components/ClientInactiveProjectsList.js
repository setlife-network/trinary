import React from 'react'
import { useQuery } from '@apollo/client'
import Grid from '@material-ui/core/Grid'

import LoadingProgress from './LoadingProgress'
import ProjectsList from './ProjectsList'
import { GET_CLIENT_INFO } from '../operations/queries/ClientQueries'

const ClientInactiveProjectList = ({
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
        return data
            ? data.getClientById.projects.filter(p => !p.is_active)
            : []
    }
    const inactiveProjects = getInactiveProjects()

    return (
        <Grid container>
            {inactiveProjects.length != 0 &&
                <ProjectsList
                    history={history}
                    projects={inactiveProjects}
                />
            }

        </Grid>
    )
}

export default ClientInactiveProjectList

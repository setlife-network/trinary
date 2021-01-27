import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { gql, useQuery } from '@apollo/client'

import { GET_ACTIVE_PROJECTS_COUNT } from '../operations/queries/ProjectQueries'

const ProjectsListManager = ({
    history,
    clientId,
    home
}) => {

    const addClient = () => {
        history.push(`/project/add/${clientId}`)
    }
    const { loading, error, data } = useQuery(GET_ACTIVE_PROJECTS_COUNT, {
        variables: {
            clientId: clientId ? Number(clientId) : null
        }
    })
    const pathname = window.location.pathname
    if (loading) {
        return (
            <Grid item xs={12}>
                Loading...
            </Grid>
        )
    }
    if (error) return `Error! ${error.message}`

    return (
        <Box
            mb={3}
            mx={1}
            className='ProjectsListManager'
        >
            <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='flex-end'
            >
                <Grid item xs={12} sm={6} md={4}>
                    <Box
                        bgcolor='primary.black'
                        color='primary.light'
                        borderRadius='borderRadius'
                        px={4}
                        py={1}
                    >
                        {
                            `${data.getActiveProjectsCount} active ${data.getActiveProjectsCount == 1
                                ? 'project'
                                : 'projects'
                            }`
                        }
                    </Box>
                </Grid>
                {
                    !home &&
                    <Grid item xs={4} align='right'>
                        <Fab
                            color='primary'
                            onClick={() => addClient()}
                        >
                            <AddIcon color='action'/>
                        </Fab>
                    </Grid>
                }
            </Grid>
        </Box>
    )
}

export default ProjectsListManager

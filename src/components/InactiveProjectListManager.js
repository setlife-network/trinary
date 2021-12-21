import React, { useState } from 'react'
import {
    Box,
    Grid,
    Switch,
    FormGroup,
    FormControlLabel
} from '@material-ui/core'
import { useQuery } from '@apollo/client';

import LoadingProgress from './LoadingProgress'
import { GET_INACTIVE_PROJECTS_COUNT } from '../operations/queries/ProjectQueries';

const InactiveProjectListManager = ({
    clientId,
    showInactiveProjects,
    setShowInactiveProjects
}) => {

    const { loading, error, data } = useQuery(GET_INACTIVE_PROJECTS_COUNT, {
        variables: {
            clientId: clientId ? Number(clientId) : null,
        },
        fetchPolicy: 'cache-and-network'
    });

    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${error.message}`;

    return (
        <Box
            mt={3}
            mb={3}
            className='InactiveProjectListManager'
        >
            {data.getInactiveProjectsCount != 0
                ? (
                    <FormGroup>
                        <FormControlLabel 
                            control={
                                <Switch 
                                    checked={showInactiveProjects}
                                    onChange={(event) => setShowInactiveProjects(event.target.checked)}
                                    name='showInactiveProjects'
                                    color='primary'
                                />
                            }
                            label='Show inactive projects'
                        />
                    </FormGroup>
                ) : null
            }
            {showInactiveProjects == true
                ? (
                    <Grid
                        container
                        direction='row'
                        justify='space-between'
                        alignItems='flex-end'
                    >
                        <Grid item xs={8} sm={6} md={4}>
                            <Box
                                bgcolor='primary.black'
                                color='primary.light'
                                borderRadius='borderRadius'
                                px={0}
                                py={1}
                                ml={1}
                            >
                                {
                                    `${data.getInactiveProjectsCount} inactive ${data.getInactiveProjectsCount == 1
                                        ? 'project'
                                        : 'projects'
                                    }`
                                }
                            </Box>
                        </Grid>
                    </Grid>
                )
                : null
            }
        </Box>

    )
}

export default InactiveProjectListManager

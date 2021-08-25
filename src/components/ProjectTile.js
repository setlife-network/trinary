import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Box,
    Button,
    Grid,
    Typography
} from '@material-ui/core'
import { boxShadow, borders, spacing, display } from '@material-ui/system'
import DeveloperBoard from '@material-ui/icons/DeveloperBoard'

const ProjectTile = ({
    project
}) => {

    const history = useHistory()

    const redirectProjectPage = (project) => {
        history.push(`/projects/${project.id}`)
    }

    const fromProjects = window.location.pathname == '/home/projects'
    const fromContributors = window.location.pathname == '/home/projects'
    const fromContributor = project.active_contributor != null
    const projectActive = (
        fromContributor
            ? project.active_contributor
                ? 'primary'
                : 'secondary'
            : project.is_active
                ? 'primary'
                : 'secondary'
    )

    return (
        <Grid container className='ProjectTile'>
            <Grid item xs={12}>
                <Button
                    fullWidth
                    onClick={() => redirectProjectPage(project)}
                >
                    <Box
                        width={1}
                        px={3}
                        py={1}
                        boxShadow={3}
                        borderRadius='borderRadius'
                        bgcolor='primary.light'
                        overflow='hidden' 
                        textOverflow='ellipsis'
                    >
                        <Grid
                            container
                            direction='row'
                            alignItems='center'
                            justify='space-around'
                        >
                            <Grid item xs={10}>
                                <Typography variant='h6' noWrap>
                                    {project.name}
                                </Typography>
                                {fromProjects &&
                                    <Typography variant='caption'>
                                        {project.client.name}
                                    </Typography>
                                }   
                            </Grid>
                            <Grid
                                item
                                xs={2}
                            >
                                <DeveloperBoard
                                    //TODO: Remake this logic without is_active
                                    color={projectActive}
                                    fontSize='large'
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Button>
            </Grid>
        </Grid>
    )
}

export default ProjectTile

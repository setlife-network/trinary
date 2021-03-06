import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Box,
    Button,
    Grid,
    Typography
} from '@material-ui/core'
import { boxShadow, borders, spacing } from '@material-ui/system'
import CodeIcon from '@material-ui/icons/Code'

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
                    >
                        <Grid
                            container
                            direction='row'
                            alignItems='center'
                            justify='space-around'
                        >
                            <Grid item xs={fromProjects ? 6 : 10}>
                                <Typography variant='h6'>
                                    {project.name}
                                </Typography>
                            </Grid>
                            {
                                fromProjects &&
                                    <Grid item xs={4}>
                                        <Typography variant='caption'>
                                            {project.client.name}
                                        </Typography>
                                    </Grid>
                            }
                            <Grid
                                item
                                xs={2}
                            >
                                <CodeIcon
                                    //TODO: Remake this logic withous is_active
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

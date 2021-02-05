import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { spacing, boxShadow, borders } from '@material-ui/system'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CodeIcon from '@material-ui/icons/Code'

const ProjectTile = ({
    history,
    project
}) => {

    const redirectProjectPage = (project) => {
        history.push(`/projects/${project.id}`)
    }

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
                            <Grid item xs={window.location.pathname == '/home/projects' ? 6 : 10}>
                                <Typography variant='h6'>
                                    {project.name}
                                </Typography>
                            </Grid>
                            {
                                window.location.pathname == '/home/projects' &&
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
                                    color={project.is_active ? 'primary' : 'secondary'}
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

ProjectTile.defaultProps = {

}

export default ProjectTile;

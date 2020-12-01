import React, { useState } from 'react'
import Card from '@material-ui/core/Card'
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
        <div className='ProjectTile'>
            <Grid
                container
                justify='center'
                alignItems='center'
                xs={12}
            >
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
                                <Grid item xs={2}>
                                    <Typography variant='subtitle1'>
                                        {project.name.toUpperCase()}
                                    </Typography>
                                </Grid>
                                {
                                    window.location.pathname == '/projects' &&
                                    <Grid item xs={2}>
                                        <Typography variant='caption'>
                                            {project.client.name}
                                        </Typography>
                                    </Grid>
                                }
                                <Grid
                                    item
                                    xs={1}
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
        </div>
    );
}

ProjectTile.defaultProps = {

}

export default ProjectTile;

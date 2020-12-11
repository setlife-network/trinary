import React, { useState } from 'react';
import { Box, Grid, Icon, Typography } from '@material-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd'

const ProjectsEmptyState = () => {
    return (
        <Grid container justify='center' className='ProjectsEmptyState'>
            <Box mt={5}>
                <Typography color='secondary' variant='h6'>
                    Add new projects directly from Github
                </Typography>
                <Box mt={5}>
                    <Icon className='fas fa-project-diagram emptyIcon' color='secondary'/>
                </Box>
            </Box>
        </Grid>
    )
}

export default ProjectsEmptyState

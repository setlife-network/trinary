import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
    Box,
    Button,
    Grid,
    Typography
} from '@material-ui/core'

const ProjectOverviewExternalLinks = (props) => {

    const {
        github_url,
        toggl_url
    } = props

    return (
        <Grid container className='ProjectOverviewExternalLinks'>
            <Grid item xs={12} sm={6}>
                <Box mt={2} mr={{ xs: 0, sm: 1 }}>
                    <Button
                        fullWidth
                        variant='outlined'
                        color='primary'
                        disabled={github_url ? 0 : 1}
                        onClick={() => window.open(github_url, '_blank')}
                    >
                        <Typography variant='h6'>
                            {`Check Github profile`}
                        </Typography>
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box mt={2} ml={{ xs: 0, sm: 1 }}>
                    <Button
                        fullWidth
                        variant='outlined'
                        color='primary'
                        disabled={toggl_url ? 0 : 1}
                        onClick={() => window.open(toggl_url, '_blank')}
                    >
                        <Typography variant='h6'>
                            {`Check Toggl profile`}
                        </Typography>
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ProjectOverviewExternalLinks

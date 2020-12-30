import React, { useState } from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

const IssueTile = (props) => {

    const { issue } = props

    return (
        <Box
            className='IssueTile'
            borderRadius='borderRadius'
            boxShadow={3}
            p={3}
            mt={3}
        >
            <Grid container>
                <Grid item xs={6} align='left'>
                    <Typography variant='h6'>
                        {issue.name}
                    </Typography>
                </Grid>
                <Grid item xs={6} align='right'>
                    <Typography color='secondary'>
                        {`Issue # ${issue.github_number}`}
                    </Typography>
                </Grid>
                <Grid item>
                    <Box mt={2}>
                        <a
                            href={`${issue.github_url}`}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <Grid container>
                                <Grid item>
                                    <Typography color='primary'>
                                        {`Issue details `}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography color='primary'>
                                        <ArrowForwardIcon/>
                                    </Typography>
                                </Grid>

                            </Grid>
                        </a>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default IssueTile

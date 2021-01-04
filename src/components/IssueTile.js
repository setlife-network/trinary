import React, { useState } from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import moment from 'moment'

const IssueTile = (props) => {

    const { issue } = props

    return (
        <Box
            className='IssueTile'
            borderRadius='borderRadius'
            boxShadow={3}
            p={3}
            my={3}
        >
            <Grid container>
                <Grid item xs={12} lg={10} align='left'>
                    <Box overflow='hidden' textOverflow='ellipsis'>
                        <Typography variant='h6' noWrap>
                            {issue.name}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} lg={2} align='left'>
                    <Typography color='secondary'>
                        {`Issue # ${issue.github_number}`}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6} align='right'>
                    <Box mt={2}>
                        <Typography color='secondary'>
                            {`${moment(issue.date_opened, ['x']).format('MM/DD/YYYY')}`}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}

export default IssueTile

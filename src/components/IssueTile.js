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
    const issueIsOpen = issue.date_closed ? false : true

    return (
        <Box
            className='IssueTile'
            borderRadius='borderRadius'
            border={1}
            borderColor='secondary.light'
            p={3}
            my={3}
        >
            <Grid container>
                <Grid
                    item
                    xs={12}
                    sm={10}
                    align='left'
                >
                    <Box overflow='hidden' textOverflow='ellipsis'>
                        <Typography variant='h6' noWrap>
                            {issue.name}
                        </Typography>
                        <Typography color='secondary'>
                            {`Issue # ${issue.github_number}`}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item lg={2}>
                    <Box
                        bgcolor={`${issueIsOpen ? 'primary.main' : 'primary.light_blue'}`}
                        borderRadius='borderRadius'
                        color={`${issueIsOpen ? 'primary.light' : 'secondary.main'}`}
                        px={2}
                        mt={1}
                    >
                        <Typography>
                            {`${issueIsOpen ? 'Open' : 'Closed'}`}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} align='left'/>
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

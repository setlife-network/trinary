import React, { useState } from 'react';
import {
    Box,
    Grid,
    Icon,
    Typography
} from '@material-ui/core'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'

const ContributorsEmptyState = (props) => {
    const { active } = props
    return (
        <Grid
            container
            justify='center'
            className='ContributorsEmptyState EmptyState'
        >
            <Box mt={2}>
                <Typography color='secondary' variant='h6'>
                    {`No contributors found`}
                </Typography>
                {
                    active &&
                    <Typography color='secondary'>
                        {`Add some contributors from the list below`}
                    </Typography>
                }
                <Box>
                    <SupervisedUserCircleIcon
                        className='empty-icon'
                        color='secondary'
                    />
                </Box>
            </Box>
        </Grid>
    )
}

export default ContributorsEmptyState

import React, { useState } from 'react';
import { Box, Grid, Icon, Typography } from '@material-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const PaymentsEmptyState = () => {
    return (
        <Grid container justify='center' className='EmptyState'>
            <Box mt={5}>
                <Typography color='secondary' variant='h6'>
                    Nothing here
                </Typography>
                <Box m={5} pb={5}>
                    <Icon className='fas fa-piggy-bank empty-icon' color='secondary'/>
                </Box>
            </Box>
        </Grid>
    )
}

export default PaymentsEmptyState

import React, { useState } from 'react';
import { Box, Grid, Icon, Typography } from '@material-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const PaymentsEmptyState = () => {
    return (
        <Grid container justifyContent='center' className='EmptyState'>
            <Box mt={5}>
                <Grid item xs={12}>
                    <Typography color='secondary' variant='h6' align='center'>
                        Nothing here
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box m={5} pb={5}>
                        <Icon className='fas fa-piggy-bank empty-icon' color='secondary'/>
                    </Box>
                </Grid>
            </Box>
        </Grid>
    )
}

export default PaymentsEmptyState

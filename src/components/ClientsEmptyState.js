import React, { useState } from 'react';
import {
    Box,
    Grid,
    Icon,
    Typography
} from '@material-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const ClientsEmptyState = () => {
    return (
        <Grid container justify='center' className='EmptyState'>
            <Box mt={5}>
                <Typography color='secondary' variant='h6'>
                    There are currently no clients. Add a client to get started
                </Typography>
                <Box mt={5}>
                    <Icon className='fas fa-user-plus empty-icon' color='secondary'/>
                </Box>
            </Box>
        </Grid>
    )
}

export default ClientsEmptyState

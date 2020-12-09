import React, { useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const NoClientsFound = () => {
    return (
        <Grid container justify='center' className='NoClientsFound'>
            <Box mt={5}>
                <Typography variant='h6' color='secondary'>
                    There are currently no clients. Add a client to get started.
                </Typography>

                <GroupAddIcon fontSize='large' className='emptyIcon'/>
            </Box>
        </Grid>
    )
}

export default NoClientsFound

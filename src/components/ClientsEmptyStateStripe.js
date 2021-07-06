import React, { useState } from 'react';
import {
    Box,
    Grid,
    Icon,
    Typography,
    Link
} from '@material-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const ClientsEmptyStateStripe = () => {

    return (
        <Grid container justify='center' className='EmptyState'>
            <Box mt={5}>
                <Typography color='secondary' variant='h6'>
                    There are currently no clients.
                    Stripe credentials are detected.
                </Typography>
                <Typography color='secondary' variant='h6'>
                    Creating or updating a Stripe customer will trigger a synchronized Client

                    Any updates to the name and email of a Client will reflect in your<Link href='https://dashboard.stripe.com/dashboard'> Stripe dashboard</Link>
                </Typography>
                <Box mt={5}>
                    <Icon className='fas fa-user-plus empty-icon' color='secondary'/>
                </Box>
            </Box>
        </Grid>
    )
}

export default ClientsEmptyStateStripe

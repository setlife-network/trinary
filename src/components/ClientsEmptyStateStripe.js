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
                    Stripe credentials are detected. You can manage clients from the...
                    <Link href='https://dashboard.stripe.com/dashboard'>
                        Stripe dashboard
                    </Link>
                    and go to
                    <Link href='https://dashboard.stripe.com/customers'>
                        Customers
                    </Link>
                    page. Add a customer and it will automatically create the new customer as a client on trinary app.
                </Typography>
                <Box mt={5}>
                    <Icon className='fas fa-user-plus empty-icon' color='secondary'/>
                </Box>
            </Box>
        </Grid>
    )
}

export default ClientsEmptyStateStripe

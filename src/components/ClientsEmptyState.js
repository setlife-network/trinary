import React, { useState } from 'react';
import {
    Box,
    Grid,
    Icon, Link,
    Typography
} from '@material-ui/core'
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const THERE_ARE_CURRENTLY_NO_CLIENTS = `There are currently no clients. Add a client to get started.`

const ClientsEmptyState = () => {
    return (
        <Grid container justify='center' className='EmptyState'>
            <Box mt={5}>
                <Typography color='secondary' variant='h6'>
                    {THERE_ARE_CURRENTLY_NO_CLIENTS}
                </Typography>
                <br/>
                <Typography color='secondary' variant='h6'>
                    To integrate with Stripe for client management, please configure the application with valid Stripe credentials (see example environment configuration
                    <Link href='https://github.com/setlife-network/trinary/blob/develop/.env.example#L13'>
                        {` here`}
                    </Link>
                    )
                    <br/>
                    Please see the
                    <Link href='https://stripe.com/docs/keys'>
                        {` Stripe documentation `}
                    </Link>
                    to generate valid credentials
                </Typography>
                <Box mt={5}>
                    <Icon className='fas fa-user-plus empty-icon' color='secondary'/>
                </Box>
            </Box>
        </Grid>
    )
}

export default ClientsEmptyState

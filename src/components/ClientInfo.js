import React from 'react'
import { useQuery } from '@apollo/client'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import EuroIcon from '@material-ui/icons/Euro';

import { lightGrey } from '../styles/colors.scss'

import { GET_CLIENT_INFO } from '../operations/queries/ClientQueries'

const ClientInfo = ({
    clientId
}) => {
    const { loading, error, data, networkStatus } = useQuery(GET_CLIENT_INFO, {
        variables: { id: parseInt(clientId, 10) }
    })

    if (loading) {
        return (
            <Grid item xs={12}>
                Loading...
            </Grid>
        )
    }
    if (error) return `Error! ${error.message}`;

    const client = data.getClientById
    return (
        <Card>

            <Box px={5} p={3} align='left'>
                <Typography variant='h4' color='primary'>
                    <strong>
                        {client.name}
                    </strong>
                </Typography>
                <Typography variant='h6'>
                    {client.email}
                </Typography>
                <Grid container alignItems='flex-end' >
                    <Grid item>
                        {
                            client.currency == 'EUR'
                                ? <EuroIcon/>
                                : <AttachMoneyIcon />
                        }
                    </Grid>
                    <Grid item>
                        <Typography variant={'h6'}>
                            {client.currency}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <hr color={lightGrey}/>
            <Box px={3} pb={1}>
                <CardActions>
                    <Button>
                        {'Edit'.toUpperCase()}
                    </Button>
                </CardActions>
            </Box>

        </Card>
    );
}

export default ClientInfo;

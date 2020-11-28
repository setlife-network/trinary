import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { gql, useQuery } from '@apollo/client';

import { GET_ACTIVE_CLIENTS_COUNT } from '../operations/queries/ClientQueries'

const ClientListManager = () => {

    const addClient = () => {
        console.log('Add client');
        //TODO:Redirect to add client page
    }

    const { loading, error, data } = useQuery(GET_ACTIVE_CLIENTS_COUNT);

    if (loading) {
        return (
            <Grid item xs={12}>
                Loading...
            </Grid>
        )
    }
    if (error) return `Error! ${error.message}`;
    return (
        <div className='ClientListManager'>
            <Box mb={3} mx={2}>
                <Grid container direction='row' justify='space-between' alignItems='flex-end'>
                    <Grid item>
                        <Box
                            bgcolor='primary.black'
                            color='primary.light'
                            borderRadius='borderRadius'
                            px={5}
                            py={1}
                        >
                            {`${data.getActiveClientsCount} active ${data.getActiveClientsCount == 1 ? 'client' : 'clients'}`}
                        </Box>
                    </Grid>
                    <Grid item>
                        <Fab color='primary' onClick={() => addClient()}>
                            <AddIcon color='action'/>
                        </Fab>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default ClientListManager

import React from 'react'
import { gql, useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid'

import ClientTile from './ClientTile'

import { GET_CLIENTS } from '../operations/queries/ClientQueries'

const ClientsList = ({
    history
}) => {

    const { loading, error, data } = useQuery(GET_CLIENTS);

    if (loading) {
        return (
            <Grid item xs={12}>
                Loading...
            </Grid>
        )
    }
    if (error) return `Error! ${error.message}`;
    return (
        data.getClients.map(c => {
            console.log('c');
            console.log(c);
            return (
                <Grid item xs={12} lg={4}>
                    <ClientTile
                        clientName={c.name}
                        clientActive={c.is_active}
                        history={history}
                    />
                </Grid>
            )
        })
    )
}

export default ClientsList

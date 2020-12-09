import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core'
import { orderBy } from 'lodash'

import { GET_CLIENTS } from '../operations/queries/ClientQueries'
import ClientTile from './ClientTile'
import NoClientsFound from './NoClientsFound'

const ClientsList = ({
    history
}) => {

    const { loading, error, data } = useQuery(GET_CLIENTS);

    const renderClientsTiles = (clients) => {
        return clients.map(c => {
            return (
                <Grid item xs={12} lg={4}>
                    <ClientTile
                        client={c}
                        history={history}
                    />
                </Grid>
            )
        })
    }

    if (loading) {
        return (
            <Grid item xs={12}>
                Loading...
            </Grid>
        )
    }
    if (error) return `Error! ${error.message}`;
    const clients = orderBy(data.getClients, 'is_active', 'desc')
    return (
        <>
            {// {
            //     clients.length != 0
            //         ? (
            //             renderClientsTiles(clients)
            //         ) : (
            //             <Typography>
            //                 There are currently no clients. Add a client to get started.
            //             </Typography>
            //         )
            // }
            }
            <NoClientsFound/>

        </>
    )
}

export default ClientsList

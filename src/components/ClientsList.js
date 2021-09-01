import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core'
import { orderBy } from 'lodash'

import ClientTile from './ClientTile'
import ClientsEmptyState from './ClientsEmptyState'
import ClientsEmptyStateStripe from './ClientsEmptyStateStripe'
import LoadingProgress from './LoadingProgress'
import { GET_ACTIVE_CLIENTS } from '../operations/queries/ClientQueries'
import { HAS_VALID_STRIPE_CREDENTIALS } from '../operations/queries/ConfigQueries';

const ClientsList = (props) => {
    const history = useHistory()
    const { loading: loadingS, error: errorS, data: dataStripe } = useQuery(HAS_VALID_STRIPE_CREDENTIALS);
    const { loading, error, data } = useQuery(GET_ACTIVE_CLIENTS, {
        fetchPolicy: 'cache-and-network'
    });

    const renderClientTiles = (clients) => {
        return clients.map(c => {
            return (
                <Grid item xs={12} sm={6} lg={4}>
                    <ClientTile
                        client={c}
                        history={history}
                    />
                </Grid>
            )
        })
    }

    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${error.message}`;

    const clients = orderBy(data.getActiveClients, 'is_active', 'desc')

    return (
        <>
            {
                clients.length != 0
                    ? (
                        renderClientTiles(clients)
                    ) : (
                        dataStripe?.checkForValidStripeCredentials
                            ? (
                                <ClientsEmptyStateStripe/>
                            ) : (
                                <ClientsEmptyState/>
                            )
                    )
            }
        </>
    )
}

export default ClientsList

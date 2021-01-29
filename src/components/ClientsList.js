import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core'
import { orderBy } from 'lodash'

import ClientTile from './ClientTile'
import ClientsEmptyState from './ClientsEmptyState'
import LoadingProgress from './LoadingProgress'
import { GET_CLIENTS } from '../operations/queries/ClientQueries'

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

    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${error.message}`;
    const clients = orderBy(data.getClients, 'is_active', 'desc')
    return (
        <>
            {
                clients.length != 0
                    ? (
                        renderClientsTiles(clients)
                    ) : (
                        <ClientsEmptyState/>
                    )
            }
        </>
    )
}

export default ClientsList

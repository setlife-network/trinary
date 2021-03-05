import React from 'react'
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core'
import { orderBy } from 'lodash'

import ClientTile from './ClientTile'
import ClientsEmptyState from './ClientsEmptyState'
import LoadingProgress from './LoadingProgress'
import { GET_CLIENTS } from '../operations/queries/ClientQueries'

const ClientsList = (props) => {
    const history = useHistory()

    const { loading, error, data } = useQuery(GET_CLIENTS);

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

    const clients = orderBy(data.getClients, 'is_active', 'desc')

    return (
        <>
            {
                clients.length != 0
                    ? (
                        renderClientTiles(clients)
                    ) : (
                        <ClientsEmptyState/>
                    )
            }
        </>
    )
}

export default ClientsList

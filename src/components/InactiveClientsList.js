import React from 'react'
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core'
import { orderBy } from 'lodash'

import ClientTile from './ClientTile'
import LoadingProgress from './LoadingProgress'
import { GET_INACTIVE_CLIENTS, GET_INACTIVE_CLIENTS_COUNT } from '../operations/queries/ClientQueries'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Box from '@material-ui/core/Box'

const InactiveClientsList = (props) => {
    const history = useHistory()
    const {
        loading: loadingInactiveClient,
        error: errorInactiveClient,
        data: dataInactiveClient
    } = useQuery(GET_INACTIVE_CLIENTS);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
    }

    const [state, setState] = React.useState({
        inactiveClientsCheck: false,
    });

    const {
        loading: loadingInactiveClientsCount,
        error: errorInactiveClientsCount,
        data: dataInactiveClientsCount
    } = useQuery(GET_INACTIVE_CLIENTS_COUNT);

    if (loadingInactiveClientsCount) return <LoadingProgress/>
    if (errorInactiveClientsCount) return `Error! ${errorInactiveClientsCount.message}`;

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

    if (loadingInactiveClient) return <LoadingProgress/>
    if (errorInactiveClient) return `Error! ${errorInactiveClient.message}`;
    const clients = orderBy(dataInactiveClient.getInactiveClients, 'is_active', 'desc')

    return (
        <>
            <FormGroup>
                <FormControlLabel
                    control=
                        {
                            <Switch
                                checked={state.inactiveClientsCheck}
                                onChange={handleChange}
                                name='inactiveClientsCheck'
                            />
                        }
                    label='Show inactive clients'
                />
            </FormGroup>
            <Grid
                container
                direction='row'
                justify='space-between'
                alignItems='flex-end'
            >
                {
                    state.inactiveClientsCheck == true
                        ? (
                            <Grid item xs={12} sm={6} md={4}>
                                <Box
                                    bgcolor='primary.black'
                                    color='primary.light'
                                    borderRadius='borderRadius'
                                    px={2}
                                    px-lg={5}
                                    py={1}
                                >
                                    {
                                        `${dataInactiveClientsCount.getInactiveClientsCount} inactive ${dataInactiveClientsCount.getInactiveClientsCount == 1
                                            ? 'client'
                                            : 'clients'
                                        }`
                                    }
                                </Box>
                            </Grid>
                        ) : null
                }
                <Grid container>
                    {
                        state.inactiveClientsCheck
                            ? clients.length != 0
                                ? renderClientTiles(clients)
                                : null
                            : null
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default InactiveClientsList
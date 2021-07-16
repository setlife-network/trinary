import React from 'react'
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Grid } from '@material-ui/core'
import { orderBy } from 'lodash'

import ClientTile from './ClientTile'
import LoadingProgress from './LoadingProgress'
import {GET_INACTIVE_CLIENTS, GET_INACTIVE_CLIENTS_COUNT} from '../operations/queries/ClientQueries'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Box from '@material-ui/core/Box'

const InactiveClientsList = (props) => {
    const history = useHistory()
    const { loading, error, data } = useQuery(GET_INACTIVE_CLIENTS);

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked })
    }

    const [state, setState] = React.useState({
        checkedA: false,
    });
    const { loading: loadingInactive , error: errorInactive, data: dataInactive } = useQuery(GET_INACTIVE_CLIENTS_COUNT);

    if (loadingInactive) return <LoadingProgress/>
    if (errorInactive) return `Error! ${errorInactive.message}`;

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
    const clients = orderBy(data.getInactiveClients, 'is_active', 'desc')

    return (
        <>
            <FormGroup>
                <FormControlLabel
                    control=
                        {
                            <Switch
                                checked={state.checkedA}
                                onChange={handleChange}
                                name='checkedA'
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
                    state.checkedA == true
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
                                        `${dataInactive.getInactiveClientsCount} inactive ${dataInactive.getInactiveClientsCount == 1
                                            ? 'client'
                                            : 'clients'
                                        }`
                                    }
                                </Box>
                            </Grid>
                        ) : (
                            false
                        )
                }
                <Grid container>
                    {
                        state.checkedA ? clients.length != 0 ? renderClientTiles(clients) : false : false
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default InactiveClientsList

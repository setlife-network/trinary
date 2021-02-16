import React from 'react'
import { useHistory } from 'react-router-dom'
import {
    Box,
    Button,
    Fab,
    Grid,
    Typography
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { gql, useQuery } from '@apollo/client'
import accounting from 'accounting-js'

import LoadingProgress from './LoadingProgress'
import { selectCurrencyInformation } from '../scripts/selectors'
import { GET_CLIENT_TOTAL_PAID } from '../operations/queries/ClientQueries'

const ClientPaymentsManager = ({
    clientId
}) => {

    const history = useHistory()

    const { loading, error, data } = useQuery(GET_CLIENT_TOTAL_PAID, {
        variables: {
            id: parseInt(clientId, 10),
            fromDate: null,
            toDate: null
        }
    })
    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${error.message}`

    const { getClientById } = data

    const currencyInformation = selectCurrencyInformation({
        currency: getClientById.currency
    })

    const totalPaid = accounting.formatMoney(
        getClientById.totalPaid / 100,
        {
            symbol: currencyInformation['symbol'],
            thousand: currencyInformation['thousand'],
            decimal: currencyInformation['decimal'],
            format: '%s %v'
        }
    )

    return (
        <Box my={3} mx={0} className='ClientPaymentsManager'>
            <Grid
                container
                justify='space-between'
                alignItems='center'
                spacing={1}
            >
                <Grid item xs={7}>
                    <Typography align='left' variant='h4'>
                        <strong>
                            Payments
                        </strong>
                    </Typography>
                </Grid>
                {
                    getClientById.totalPaid &&
                    (
                        <>
                            <Grid item xs={10} md={3}>
                                <Typography align='left' variant='h5' >
                                    <strong>
                                        {`${totalPaid} Total`}
                                    </strong>
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                md={1}
                                align='right'
                                onClick={() => history.push(`/clients/${clientId}/payments/add`)}
                            >
                                <Fab
                                    color='primary'
                                    size='medium'
                                >
                                    <AddIcon color='action'/>
                                </Fab>
                            </Grid>
                        </>
                    )
                }
            </Grid>
        </Box>
    )
}

export default ClientPaymentsManager

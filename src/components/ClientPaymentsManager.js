import React from 'react'
import {
    AddIcon,
    Box,
    Button,
    Grid,
    Typography
} from '@material-ui/core'
import { gql, useQuery } from '@apollo/client'
import accounting from 'accounting-js'

import LoadingProgress from './LoadingProgress'
import { selectCurrencyInformation } from '../scripts/selectors'
import { GET_CLIENT_TOTAL_PAID } from '../operations/queries/ClientQueries'

const ClientPaymentsManager = ({
    clientId
}) => {

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
        <Box mt={3} mx={0} className='ClientPaymentsManager'>
            <Grid
                container
                justify='space-between'
            >
                <Grid item>
                    <Typography align='left' variant='h4'>
                        <strong>
                            Payments
                        </strong>
                    </Typography>
                </Grid>
                {
                    getClientById.totalPaid &&
                    (
                        <Grid item>
                            <Typography align='left' variant='h4'>
                                <strong>
                                    {`${totalPaid} Total`}
                                </strong>
                            </Typography>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    )
}

export default ClientPaymentsManager

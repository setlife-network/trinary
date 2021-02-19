import React, { useState } from 'react'
import { useQuery } from '@apollo/client';
import moment from 'moment'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { orderBy } from 'lodash'

import LoadingProgress from './LoadingProgress'
import PaymentsEmptyState from './PaymentsEmptyState'
import PaymentTile from './PaymentTile'
import PaymentsList from './PaymentsList'
import { GET_PROJECT_PAYMENTS } from '../operations/queries/ProjectQueries'
import { pageName } from '../reactivities/variables'
import {
    calculateTotalPayments,
    formatAmount,
    selectCurrencyInformation
} from '../scripts/selectors'

const ProjectPayments = (props) => {

    const { projectId } = props

    const { loading, error, data } = useQuery(GET_PROJECT_PAYMENTS, {
        variables: {
            id: Number(projectId)
        }
    })

    if (loading) return <LoadingProgress/>
    if (error) return `Error! ${error.message}`

    const { getProjectById } = data
    const { allocatedPayments, client } = getProjectById
    pageName(getProjectById.name)
    const payments = orderBy(allocatedPayments, ['date_paid'], ['desc'])
    const currencyInformation = selectCurrencyInformation({ currency: client.currency })
    const totalPaidAmount = formatAmount({
        amount: calculateTotalPayments(allocatedPayments) / 100,
        currencyInformation: currencyInformation
    })

    return (

        <Grid container justify='center' className='ProjectPayments'>
            <Grid item xs={12} align='left'>
                <Box p={3}>
                    <Grid container justify='space-between' alignItems='flex-end'>
                        <Grid item>
                            <Typography variant='h4'>
                                <strong>
                                    {'Payments'}
                                </strong>
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='h5'>
                                <strong>
                                    {`${totalPaidAmount} Total`}
                                </strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                {allocatedPayments.length != 0
                    ? (
                        <PaymentsList
                            payments={payments}
                            project={getProjectById}
                        />
                    )
                    : (
                        <PaymentsEmptyState/>
                    )
                }
            </Grid>
        </Grid>

    )
}

export default ProjectPayments

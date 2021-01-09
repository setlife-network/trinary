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

import PaymentsEmptyState from './PaymentsEmptyState'
import PaymentTile from './PaymentTile'
import PaymentsList from './PaymentsList'
import { GET_PROJECT } from '../operations/queries/ProjectQueries'

const ProjectPayments = (props) => {

    const calculateTotalPayments = (payments) => {
        return payments.reduce((sum, payment) => {
            return sum + payment.amount;
        }, 0)
    }

    const { projectId } = props

    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: {
            id: Number(projectId)
        }
    })

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    if (error) return `Error! ${error.message}`

    const { getProjectById } = data
    const { allocatedPayments, client } = getProjectById

    const payments = orderBy(allocatedPayments, ['date_paid'], ['desc'])

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
                                    {`${calculateTotalPayments(allocatedPayments)} ${client.currency} Total`}
                                </strong>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                {allocatedPayments.length != 0
                    ? (
                        <PaymentsList payments={payments}/>
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

import React from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

import { GET_PROJECT_PAYMENTS_SUMMARY } from '../operations/queries/ProjectQueries'
import { formatAmount } from '../scripts/selectors'

const ProjectPaymentsSummary = (props) => {

    const {
        currencyInformation,
        project
    } = props

    const {
        data: dataPaymentsSummary,
        error: errorPaymentsSummary,
        loading: loadingPaymentsSummary
    } = useQuery(GET_PROJECT_PAYMENTS_SUMMARY, {
        fetchPolicy: 'cache-and-network',
        variables: {
            id: Number(project.id)
        }
    })

    if (loadingPaymentsSummary) return 'Loading'
    if (errorPaymentsSummary) return `Error ${errorPaymentsSummary}`

    const { getProjectById: projectPaymentsSummary } = dataPaymentsSummary

    const totalAllocatedAmount = formatAmount({
        amount: projectPaymentsSummary.totalAllocated / 100,
        currencyInformation: currencyInformation
    })
    const totalAllocatedNonConfirmedAmount = formatAmount({
        amount: projectPaymentsSummary.totalAllocated / 100 - projectPaymentsSummary.totalAllocatedConfirmed / 100,
        currencyInformation: currencyInformation
    })
    const totalPaidClientAmount = formatAmount({
        amount: projectPaymentsSummary.totalPaid / 100,
        currencyInformation: currencyInformation
    })
    const totalProfit = projectPaymentsSummary.totalPaid / 100 - projectPaymentsSummary.totalAllocated / 100
    const totalProfitAmount = formatAmount({
        amount: totalProfit > 0 ? totalProfit : 0,
        currencyInformation: currencyInformation
    })

    return (
        <Box
            p={3}
            mb={3}
            borderRadius='borderRadius'
            bgcolor='primary.light_blue'
            fontWeight='fontWeightBold'
            className='ProjectSummary'
        >
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant='h6'>
                        <strong>
                            {`Payments summary`}
                        </strong>
                    </Typography>
                    <Typography>
                        {`${totalPaidClientAmount} paid from client`}
                    </Typography>
                    <Typography>
                        {`${totalAllocatedAmount} allocated`}
                    </Typography>
                    <Typography>
                        {`${totalProfitAmount} not allocated`}
                    </Typography>
                    <Typography>
                        {`${totalAllocatedNonConfirmedAmount} on allocations not confirmed`}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProjectPaymentsSummary

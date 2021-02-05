import React from 'react'
import { useQuery } from '@apollo/client'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Fab,
    Grid,
    Typography
} from '@material-ui/core/'
import AddIcon from '@material-ui/icons/Add'
import moment from 'moment'

import { GET_ALLOCATIONS } from '../operations/queries/AllocationQueries'
import {
    formatAmount,
    selectCurrencyInformation
} from '../scripts/selectors'

const ContributorTile = (props) => {

    const {
        active,
        contributor,
        onAddButton,
        project
    } = props

    const handleAddButton = () => {
        onAddButton({ contributor })
    }

    const {
        data: dataAllocation,
        error: errorAllocation,
        loading: loadingAllocation
    } = useQuery(GET_ALLOCATIONS, {
        variables: {
            projectId: project.id,
            contributorId: contributor.id
        }
    })

    const renderContributorAllocations = (props) => {
        const {
            allocations
        } = props

        return allocations.map(a => {

            const currencyInformation = selectCurrencyInformation({
                currency: a.payment.client.currency
            })

            const allocationAmount = formatAmount({
                amount: a.amount / 100,
                currencyInformation: currencyInformation
            })
            const hourlyRateAmount = formatAmount({
                amount: a.rate.hourly_rate,
                currencyInformation: currencyInformation
            })

            return (
                <Grid container>
                    <Grid item xs={4}>
                        <Typography color='secondary' variant='caption'>
                            <strong>
                                {`Total allocated:`}
                            </strong>
                            <br/>
                            {`${allocationAmount}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography color='secondary' variant='caption'>
                            <strong>
                                {`Rate:`}
                            </strong>
                            <br/>
                            {`${hourlyRateAmount} /h.`}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography color='secondary' variant='caption'>
                            <strong>
                                {`Expected hours:`}
                            </strong>
                            <br/>
                            {`${a.rate.total_expected_hours} h.`}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography color='secondary' variant='caption'>
                            <strong>
                                {`Start date:`}
                            </strong>
                            <br/>
                            {`${moment(a.start_date, 'x').format('MM/DD/YYYY')}`}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography color='secondary' variant='caption'>
                            <strong>
                                {`End date:`}
                            </strong>
                            <br/>
                            {`${moment(a.end_date, 'x').format('MM/DD/YYYY')}`}
                        </Typography>
                    </Grid>
                </Grid>
            )
        })

    }

    if (loadingAllocation) return ''
    if (errorAllocation) return `An error ocurred ${errorAllocation}`

    const { getAllocations: allocations } = dataAllocation

    return (
        <Box
            className='ContributorTile'
            bgcolor={`${active ? 'primary.light_blue' : ''}`}
            borderRadius='borderRadius'
            p={2}
            my={2}
            mx={active ? 1 : 0}
            align='left'
        >
            <Accordion>

                <Grid container alignItems='center'>
                    <Grid item xs={'auto'}>
                        <Fab
                            color={`${active ? 'secondary' : 'primary'}`}
                            size='small'
                            onClick={() => handleAddButton()}
                            className={`${active && 'outlined-add-icon'}`}
                        >
                            <AddIcon color='action'/>
                        </Fab>
                    </Grid>
                    <AccordionSummary>
                        <Grid item xs={10}>
                            <Typography>
                                <strong>
                                    {contributor.name}
                                </strong>
                            </Typography>
                            {contributor.github_handle}
                        </Grid>
                    </AccordionSummary>
                </Grid>

                <AccordionDetails>

                    {
                        renderContributorAllocations({
                            allocations: allocations
                        })
                    }

                </AccordionDetails>
            </Accordion>
        </Box>

    )
}

export default ContributorTile

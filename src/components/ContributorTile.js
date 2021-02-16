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
import { filter, sortBy } from 'lodash'

import { GET_ALLOCATIONS } from '../operations/queries/AllocationQueries'
import {
    formatAmount,
    selectActiveAndUpcomingAllocations,
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

        const currenctAndUpcomingAllocations = filter(allocations, (allocation) => (
            selectActiveAndUpcomingAllocations({
                allocation: allocation
            })
        ))
        const sortedAllocations = sortBy(currenctAndUpcomingAllocations, ['start_date'])

        return sortedAllocations.map(a => {

            const currencyInformation = selectCurrencyInformation({
                currency: a.payment ? a.payment.client.currency : ''
            })
            const allocationAmount = formatAmount({
                amount: a.amount / 100,
                currencyInformation: currencyInformation
            })
            const hourlyRateAmount = formatAmount({
                amount: a.rate.hourly_rate,
                currencyInformation: currencyInformation
            })
            const isActiveAllocation = moment(a.start_date, 'x').isBefore(moment())

            return (
                <Grid item xs={12}>
                    <hr/>
                    <Box my={1}>
                        <Grid container>
                            <Grid item xs={4}>
                                <Typography
                                    color={`${!isActiveAllocation && 'secondary'}`}
                                    variant='caption'
                                >
                                    <strong>
                                        {`Total allocated:`}
                                    </strong>
                                    <br/>
                                    {`${allocationAmount}`}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography
                                    color={`${!isActiveAllocation && 'secondary'}`}
                                    variant='caption'
                                >
                                    <strong>
                                        {`Rate:`}
                                    </strong>
                                    <br/>
                                    {`${hourlyRateAmount} /h.`}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography
                                    color={`${!isActiveAllocation && 'secondary'}`}
                                    variant='caption'
                                >
                                    <strong>
                                        {`Expected hours:`}
                                    </strong>
                                    <br/>
                                    {`${a.rate.total_expected_hours
                                        ? `${a.rate.total_expected_hours} h.`
                                        : `Doesn't apply`
                                    }`}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography
                                    color={`${!isActiveAllocation && 'secondary'}`}
                                    variant='caption'
                                >
                                    <strong>
                                        {`Start date:`}
                                    </strong>
                                    <br/>
                                    {`${moment(a.start_date, 'x').format('MM/DD/YYYY')}`}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography
                                    color={`${!isActiveAllocation && 'secondary'}`}
                                    variant='caption'
                                >
                                    <strong>
                                        {`End date:`}
                                    </strong>
                                    <br/>
                                    {`${moment(a.end_date, 'x').format('MM/DD/YYYY')}`}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography
                                    color={`${!isActiveAllocation && 'secondary'}`}
                                    variant='caption'
                                >
                                    <strong>
                                        {`Date paid:`}
                                    </strong>
                                    <br/>
                                    {`${a.date_paid
                                        ? moment(a.date_paid, 'x').format('MM/DD/YYYY')
                                        : 'Proposed'
                                    }`}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            )
        })
    }

    if (loadingAllocation) return ''
    if (errorAllocation) return `An error ocurred ${errorAllocation}`

    const { getAllocations: allocations } = dataAllocation

    console.log('allocations');
    console.log(allocations);

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
                    <Grid item xs={2}>
                        <Fab
                            color={`${active ? 'secondary' : 'primary'}`}
                            size='small'
                            onClick={() => handleAddButton()}
                            className={`${active && 'outlined-add-icon'}`}
                        >
                            <AddIcon color='action'/>
                        </Fab>
                    </Grid>
                    <Grid item xs={10}>
                        <AccordionSummary>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography>
                                        <strong>
                                            {contributor.name}
                                        </strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {contributor.github_handle}
                                </Grid>
                            </Grid>
                        </AccordionSummary>
                    </Grid>
                </Grid>
                <AccordionDetails>
                    <Grid container>
                        {
                            renderContributorAllocations({
                                allocations: allocations
                            })
                        }
                    </Grid>
                </AccordionDetails>
            </Accordion>
        </Box>

    )
}

export default ContributorTile

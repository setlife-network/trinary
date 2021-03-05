import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Fab,
    Grid,
    Icon,
    Typography
} from '@material-ui/core'

import AllocationOverview from './AllocationOverview'
import { GET_PROJECT_TOTAL_PROPOSED } from '../operations/queries/ProjectQueries'
import { formatAmount } from '../scripts/selectors'

import moment from 'moment'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const ProjectProposedAllocationsTile = (props) => {

    const {
        currencyInformation,
        proposedAllocations,
        project
    } = props

    const {
        data: dataTotalProposed,
        error: errorTotalProposed,
        loading: loadingTotalProposed
    } = useQuery(GET_PROJECT_TOTAL_PROPOSED, {
        variables: {
            id: project.id
        }
    })

    const [openAllocationOverview, setOpenAllocationOverview] = useState(null)
    const [selectedAllocation, setSelectedAllocation] = useState(null)

    const handleAllocationClicked = ({ value, allocation }) => {
        setSelectedAllocation(allocation)
        setOpenAllocationOverview(value)
    }

    const renderAllocations = ({ allocations, currencyInformation }) => {

        return allocations.map(a => {

            const paymentAmount = formatAmount({
                amount: a.amount / 100,
                currencyInformation: currencyInformation
            })

            return (
                <Grid item xs={12}>
                    <Box mb={3}>
                        <Grid
                            container
                            onClick={() => handleAllocationClicked({ value: true, allocation: a })}
                        >
                            <Grid items xs={10} >
                                <Typography color='secondary' variant='caption'>
                                    {`${a.contributor.name}`}
                                </Typography>
                            </Grid>
                            <Grid item xs={2} align='right'>
                                <Typography color='secondary' variant='caption'>
                                    {`${paymentAmount}`}
                                </Typography>
                            </Grid>
                            <Grid items xs={7}>
                                <Typography color='secondary' variant='caption'>
                                    {`
                                        ${currencyInformation['symbol']}${a.rate.hourly_rate}/hr (${a.rate.type == 'monthly_rate' ? 'monthly rate' : 'max budget'})
                                    `}
                                </Typography>
                            </Grid>
                            <Grid item xs={5} align='right'>
                                <Typography color='secondary' variant='caption'>
                                    {`Ends ${moment(a.end_date, 'x').format('MM/DD/YYYY')} `}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            )
        })
    }

    if (loadingTotalProposed) return ''
    if (errorTotalProposed) return 'Error'

    const { getProjectById: projectAllocated } = dataTotalProposed
    const totalAllocatedNotPaid = formatAmount({
        amount: (projectAllocated.totalAllocated - projectAllocated.totalAllocatedConfirmed) / 100,
        currencyInformation: currencyInformation
    })

    return (

        <Box
            borderRadius='borderRadius'
            bgcolor='primary.light'
            mx={1}
            className='ProjectProposedAllocationsTile'
        >
            <Accordion>
                <AccordionSummary
                    expandIcon={
                        <ExpandMoreIcon />
                    }
                >
                    <Grid container>
                        <Grid item xs={6}>
                            <strong>
                                {'Total proposed'}
                            </strong>
                        </Grid>
                        <Grid item xs={6} align='right'>
                            <Icon
                                className='fas fa-money-bill-wave'
                                color='secondary'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {`${totalAllocatedNotPaid}`}
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container>
                        {renderAllocations({
                            allocations: proposedAllocations,
                            currencyInformation: currencyInformation
                        })}
                    </Grid>
                </AccordionDetails>
            </Accordion>
            {selectedAllocation &&
                <AllocationOverview
                    allocationInfo={selectedAllocation}
                    onClose={() => handleAllocationClicked(false)}
                    open={openAllocationOverview}
                />
            }
        </Box>
    )
}

export default ProjectProposedAllocationsTile

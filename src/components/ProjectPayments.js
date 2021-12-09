import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import {
    Box,
    Fab,
    Grid,
    Typography,
    Button,
    Divider
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { filter, isEmpty, orderBy } from 'lodash'

import AllocationAddForm from './AllocationAddForm'
import LoadingProgress from './LoadingProgress'
import PaymentsEmptyState from './PaymentsEmptyState'
import PaymentsList from './PaymentsList'
import ProjectPaymentsSummary from './ProjectPaymentsSummary'
import ProjectProposedAllocationsTile from './ProjectProposedAllocationsTile'

import { GET_PROJECT_CONTRIBUTOR_ALLOCATIONS, GET_PROJECT_PAYMENTS } from '../operations/queries/ProjectQueries'
import { pageName } from '../reactivities/variables'
import {
    calculateTotalPayments,
    formatAmount,
    selectCurrencyInformation
} from '../scripts/utilities'
import { white } from '../styles/colors.scss'

const ProjectPayments = (props) => {

    const { projectId } = props
    const history = useHistory()

    const [openAddAllocationDialog, setOpenAddAllocationDialog] = useState(false)

    const { loading, error, data } = useQuery(GET_PROJECT_PAYMENTS, {
        fetchPolicy: 'cache-and-network',
        variables: {
            id: Number(projectId)
        }
    })
    const {
        data: dataProjectAllocations,
        error: errorProjectAllocations,
        loading: loadingProjectAllocations,
    } = useQuery(GET_PROJECT_CONTRIBUTOR_ALLOCATIONS, {
        fetchPolicy: 'cache-and-network',
        variables: {
            id: Number(projectId),
        }
    })

    if (loading || loadingProjectAllocations) return <LoadingProgress/>
    if (error || errorProjectAllocations) return `Error!`

    const { getProjectById } = data
    const { getProjectById: projectAllocations } = dataProjectAllocations
    const { allocatedPayments, client } = getProjectById
    pageName(getProjectById.name)
    const payments = orderBy(allocatedPayments, ['date_paid'], ['desc'])
    const currencyInformation = selectCurrencyInformation({ currency: client.currency })
    const totalPaidAmount = formatAmount({
        amount: calculateTotalPayments(allocatedPayments) / 100,
        currencyInformation: currencyInformation
    })
    const proposedAllocations = filter(projectAllocations.allocations, ['payment', null])

    const handleAddAllocationClose = (value) => {
        setOpenAddAllocationDialog(false)
    }

    const handleProposeButton = () => {
        setOpenAddAllocationDialog(true)
    }
    
    return (

        <Grid container justify='center' className='ProjectPayments'>
            <Grid item xs={12} align='left'>
                <Box p={3}>
                    <Grid container justify='space-between' alignItems='flex-end'>
                        <Grid item xs={12} sm={8}>
                            <Typography variant='h4'>
                                <strong>
                                    {'Payments'}
                                </strong>
                            </Typography>
                        </Grid>
                        <Grid item xs={11} sm={3}>
                            <Typography variant='h5'>
                                <strong>
                                    {`${totalPaidAmount} Total`}
                                </strong>
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={1}
                            align='right'
                            onClick={() => history.push(`/clients/${getProjectById.client.id}/payments/add`)}
                        >
                            <Fab
                                color='primary'
                                size='medium'
                            >
                                <AddIcon color='action'/>
                            </Fab>
                        </Grid>
                    </Grid>
                </Box>
                <ProjectPaymentsSummary
                    project={getProjectById}
                    currencyInformation={currencyInformation}
                />
                <Grid container>
                    <Grid item xs={12}>
                        <Box mb={1} ml={1}>
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => handleProposeButton()}
                            >
                                <Box color={`${white}`}>
                                    <Typography>
                                        {`Add Allocation`}
                                    </Typography>
                                </Box>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
                {!isEmpty(allocatedPayments) &&
                    <PaymentsList
                        payments={payments}
                        project={getProjectById}
                    />
                }
                {!isEmpty(proposedAllocations) &&
                    (
                        <Grid container>
                            <Grid item xs={12}>
                                <Box mt={3} mb={5} pb={6}>
                                    <hr></hr>
                                    <Box mt={3}>
                                        <ProjectProposedAllocationsTile
                                            currencyInformation={currencyInformation}
                                            proposedAllocations={proposedAllocations}
                                            project={getProjectById}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    )
                }
                {(!allocatedPayments.length && !proposedAllocations.length) &&
                    <PaymentsEmptyState/>
                }
            </Grid>
            <AllocationAddForm 
                project={getProjectById}
                open={openAddAllocationDialog}
                onClose={handleAddAllocationClose}
            />
        </Grid>

    )
}

export default ProjectPayments

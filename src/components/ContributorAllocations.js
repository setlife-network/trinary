import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Button,
    Grid,
    Typography
} from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'
import { isEmpty } from 'lodash'

import AllocationAddForm from './AllocationAddForm'
import AllocationTile from './AllocationTile'
import EmptyState from './EmptyState'
import LoadingProgress from './LoadingProgress'
import {
    GET_CONTRIBUTOR_ALLOCATIONS,
    GET_CONTRIBUTOR_INFO
} from '../operations/queries/ContributorQueries'
import { white } from '../styles/colors.scss'

const ContributorAllocations = (props) => {

    const {
        contributorId
    } = props

    const [openAddAllocationDialog, setOpenAddAllocationDialog] = useState(false)

    const {
        data: dataContributorAllocations,
        loading: loadingContributorAllocations,
        error: errorContributorAllocations
    } = useQuery(GET_CONTRIBUTOR_ALLOCATIONS, {
        variables: {
            id: Number(contributorId)
        }
    })
    const {
        data: dataContributor,
        loading: loadingContributor,
        error: errorContributor
    } = useQuery(GET_CONTRIBUTOR_INFO, {
        variables: {
            id: Number(contributorId)
        }
    })

    const handleAddAllocationClose = (value) => {
        setOpenAddAllocationDialog(false)
    }
    const handleProposeButton = () => {
        setOpenAddAllocationDialog(true)
    }

    const renderAllocations = ({ allocations }) => {
        return allocations.map(a => {
            return (
                <Grid item xs={12} sm={6} lg={4}>
                    <AllocationTile allocation={a}/>
                </Grid>
            )
        })
    }

    console.log(dataContributorAllocations)

    if (loadingContributorAllocations || loadingContributor) return <LoadingProgress/>
    if (errorContributorAllocations || errorContributor) return 'Error!'

    const { getContributorById: contributorAllocations } = dataContributorAllocations
    const { getContributorById: contributor } = dataContributor
    
    const allocatedAllocations = []
    const proposedAllocations = []
    contributorAllocations.allocations.map(d => {
        if (d.payment) {
            allocatedAllocations.push(d)
        } else {
            proposedAllocations.push(d)
        }
    })

    return (
        <Box my={[2, 5]} mx={3} className='ContributorAllocations'>
            <Grid container spacing={4}>
                <Grid item xs='auto'>
                    <Typography variant='h5' color='primary'>
                        <strong>
                            {`Allocations`}
                        </strong>
                    </Typography>
                </Grid>
                <Grid item xs='auto'>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => handleProposeButton()}
                    >
                        <Box color={`${white}`}>
                            <Typography>
                                {`Propose`}
                            </Typography>
                        </Box>
                    </Button>
                </Grid>
                <Grid item xs='auto'>
                    <Button>
                        <SortIcon/>
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6' color='secondary'>
                        {`Allocated`}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={5}>
                        {!isEmpty(allocatedAllocations)
                            ? renderAllocations({ allocations: allocatedAllocations })
                            : (
                                <EmptyState
                                    description='This contributor has no allocations at the moment'
                                    iconClassName='fas fa-money-check'
                                />
                            )
                        }
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6' color='secondary'>
                        {`Proposed`}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={5}>
                        {!isEmpty(proposedAllocations)
                            ? renderAllocations({ allocations: proposedAllocations })
                            : (
                                <EmptyState
                                    description='This contributor has no proposed allocations'
                                    iconClassName='fas fa-money-check'
                                />
                            )
                        }
                    </Grid>
                </Grid>
            </Grid>
            <AllocationAddForm
                open={openAddAllocationDialog}
                onClose={handleAddAllocationClose}
                contributor={contributor}
            />
        </Box>
    )
}

export default ContributorAllocations

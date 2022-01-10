import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Box,
    Button,
    Grid,
    Typography,
    Menu,
    MenuItem
} from '@material-ui/core'
import SortIcon from '@material-ui/icons/Sort'
import { isEmpty, filter, orderBy } from 'lodash'

import AllocationAddForm from './AllocationAddForm'
import AllocationTile from './AllocationTile'
import EmptyState from './EmptyState'
import LoadingProgress from './LoadingProgress'
import {
    GET_CONTRIBUTOR_ALLOCATIONS,
    GET_CONTRIBUTOR_INFO
} from '../operations/queries/ContributorQueries'
import colors from '../styles/colors.module.scss'

const { white } = colors

const ContributorAllocations = (props) => {

    const {
        contributorId
    } = props

    const [openAddAllocationDialog, setOpenAddAllocationDialog] = useState(false)
    const [anchorEl, setanchorEl] = useState(null)
    const [sortAllocated, setSortAllocated] = useState()
    const [sortProposed, setSortProposed] = useState()
    const [selectedSort, setSelectedSort] = useState()
    const [allocatedAllocations, setAllocatedAllocations] = useState([])
    const [proposedAllocations, setProposedAllocations] = useState([])

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

    const sortAllocations = ({ typeName, allocated, proposed, sortingType, sortingOrder }) => {
        if (typeName == 'Clear') {
            setSelectedSort(null)
        } else {
            setSortAllocated(orderBy(allocated.allocations, sortingType, sortingOrder))
            setSortProposed(orderBy(proposed.allocations, sortingType, sortingOrder))
            setSelectedSort(typeName)
        }
        handleClose()
    }

    const sortingOptions = [
        {
            name: 'Start Date (Newest first)',
            sorting: () => sortAllocations({
                typeName: 'Start Date (Newest first)',
                sortingType: ['start_date'],
                sortingOrder: ['desc'],
                allocated: {
                    allocations: allocatedAllocations,
                },
                proposed: {
                    allocations: proposedAllocations,
                }
            })
        },
        {
            name: 'Start Date (Older first)',
            sorting: () => sortAllocations({
                typeName: 'Start Date (Older first)',
                sortingType: ['start_date'],
                sortingOrder: ['asc'],
                allocated: {
                    allocations: allocatedAllocations,
                },
                proposed: {
                    allocations: proposedAllocations,
                }
            })
        },
        {
            name: 'Project',
            sorting: () => sortAllocations({
                typeName: 'Project',
                sortingType: item => item.project.name.toLowerCase(),
                sortingOrder: ['asc'],
                allocated: {
                    allocations: allocatedAllocations,
                },
                proposed: {
                    allocations: proposedAllocations,
                }
            })
        },
        {
            name: 'Client',
            sorting: () => sortAllocations({
                typeName: 'Client',
                sortingType: item => item.project.client.name.toLowerCase(),
                sortingOrder: ['asc'],
                allocated: {
                    allocations: allocatedAllocations,
                },
                proposed: {
                    allocations: proposedAllocations,
                }
            })
        },
        {
            name: 'Payment',
            sorting: () => sortAllocations({
                typeName: 'Payment',
                sortingType: ['amount'],
                sortingOrder: ['desc'],
                allocated: {
                    allocations: allocatedAllocations,
                },
                proposed: {
                    allocations: proposedAllocations,
                }
            })
        },
        {
            name: 'Clear',
            sorting: () => sortAllocations({
                typeName: 'Clear',
                sortingType: null,
                sortingOrder: null,
                allocated: {
                    allocations: allocatedAllocations,
                },
                proposed: {
                    allocations: proposedAllocations,
                }
            })
        }
    ]

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

    if (loadingContributorAllocations || loadingContributor) return <LoadingProgress/>
    if (errorContributorAllocations || errorContributor) return 'Error!'

    const { getContributorById: contributorAllocations } = dataContributorAllocations
    const { getContributorById: contributor } = dataContributor

    if (!allocatedAllocations.length || !proposedAllocations.length) {
        setAllocatedAllocations([...filter(contributorAllocations.allocations, 'payment')])
        setProposedAllocations([...filter(contributorAllocations.allocations, { 'payment': null })])
    }

    const handleSortButton = (event) => {
        setanchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setanchorEl(null);
    }

    const renderSortOptions = () => {
        return sortingOptions.map(so => {
            return (
                <MenuItem onClick={so.sorting}>{so.name}</MenuItem>
            )
        })
    }

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
                    <Button aria-controls='simple-menu' aria-haspopup='true' onClick={handleSortButton}>
                        <SortIcon/>
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {renderSortOptions()}

                    </Menu>
                </Grid>
                {selectedSort
                    ? (
                        <Grid item xs='12'>
                            <Typography variant='subtitle1' color='primary'>
                                {'Sorting by ' + selectedSort}
                            </Typography>
                        </Grid>
                    ) : null
                }
                <Grid item xs={12}>
                    <Typography variant='h6' color='secondary'>
                        {`Allocated`}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={5}>
                        {!isEmpty(allocatedAllocations)
                            ? (isEmpty(sortAllocated)
                                ? renderAllocations({ allocations: allocatedAllocations })
                                : renderAllocations({ allocations: sortAllocated })
                            ) : (
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
                            ? (isEmpty(sortProposed)
                                ? renderAllocations({ allocations: proposedAllocations })
                                : renderAllocations({ allocations: sortProposed })
                            ) : (
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

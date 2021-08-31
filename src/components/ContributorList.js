import React, { useState } from 'react'
import {
    Grid,
    Box,
    TextField,
    Typography
} from '@material-ui/core'
import ContributorsEmptyState from './ContributorsEmptyState'
import AllocationAddForm from './AllocationAddForm'
import ContributorTile from './ContributorTile'
import { differenceBy } from 'lodash'
import ActiveContributors from './ActiveContributors'
import UpcomingContributors from './UpcomingContributors'
import Contributors from './Contributors'

const ContributorList = (props) => {

    const {
        contributors,
        project,
        activeContributorsAllocated,
        upcomingContributorsAllocatedOnly,
        errorGithubContributors,
        isNotAContributor
    } = props

    const [searchFilter, setSearchFilter] = useState('')
    const [openAddAllocationDialog, setOpenAddAllocationDialog] = useState(false)
    const [contributorClicked, setContributorClicked] = useState(null)

    const stringMatchName = (string) => {
        return string.name.toLowerCase().includes(searchFilter.toLowerCase())
    }

    const stringMatchGithub = (string) => {
        return string.github_handle.toLowerCase().includes('https://github.com/'.concat(searchFilter).toLowerCase())
    }

    const getActiveContributors = () => {
        if (searchFilter == '') {
            return activeContributorsAllocated
        } else {
            return activeContributorsAllocated.filter(a => {
                return stringMatchName(a) || stringMatchGithub(a)
            })
        }
    }
    const activeContributors = getActiveContributors()

    const getUpcomingContributors = () => {
        if (searchFilter == '') {
            return upcomingContributorsAllocatedOnly
        } else {
            return upcomingContributorsAllocatedOnly.filter(u => {
                return stringMatchName(u) || stringMatchGithub(u)
            })
        }
    }
    const upcomingContributors = getUpcomingContributors()

    const getContributorsToAdd = () => {
        const addContributors = differenceBy(contributors, [...activeContributorsAllocated, ...upcomingContributorsAllocatedOnly], 'id')
        if (searchFilter == '') {
            return addContributors
        } else {
            return addContributors.filter(a => {
                return stringMatchName(a) || stringMatchGithub(a)
            })
        }
    }
    const contributorsToAdd = getContributorsToAdd()

    const addAllocation = (props) => {
        setOpenAddAllocationDialog(true)
        setContributorClicked(props.contributor)
    }

    const handleAddAllocationClose = (value) => {
        setOpenAddAllocationDialog(false)
    }

    const renderContributors = (props) => {
        const {
            active,
            contributors,
            project
        } = props
        return contributors.map(c => {
            return (
                <Grid item xs={12} md={6}>
                    <ContributorTile
                        active={active}
                        contributor={c}
                        onAddButton={addAllocation}
                        project={project}
                    />
                </Grid>
            )
        })
    }

    return (
        <Grid container className='ProjectContributors'>
            <h1>
                {`${project.name} Contributors`}
            </h1>
            <Grid xs={12}/>
            <Grid item xs={12} sm={5}>
                <Box
                    bgcolor='primary.black'
                    color='primary.light'
                    borderRadius='borderRadius'
                    px={5}
                    py={1}
                    mb={[2, 5]}
                >
                    {
                        `${activeContributors.length} active ${activeContributors.length == 1
                            ? 'contributor'
                            : 'contributors'
                        }`
                    }
                </Box>
            </Grid>
            <Grid xs={12}/>
            <Grid item xs={12} sm={5}>
                <TextField
                    placeholder='Search contributors...' 
                    onChange={(event) => { setSearchFilter(event.target.value) }}
                    fullWidth
                    color='primary'
                    variant='outlined'
                    type='search'
                />
            </Grid>
            <Grid item xs={12}>
                <Box my={[2, 5]}>
                    <Typography align='left' variant='h5'>
                        {`Active contributors`}
                    </Typography>
                    <Grid container>
                        {

                            activeContributors.length != 0
                                ? <ActiveContributors
                                    active
                                    contributors={activeContributors}
                                    project={project}
                                    addAllocation={addAllocation}
                                />
                                : <ContributorsEmptyState active/>

                        }
                    </Grid>
                </Box>
                <Box my={[2, 5]}>
                    <Typography align='left' variant='h5'>
                        {`Upcoming contributors`}
                    </Typography>
                    <Grid container>
                        {
                            upcomingContributors.length != 0
                                ? <UpcomingContributors 
                                    active
                                    contributors={upcomingContributors}
                                    project={project}
                                    addAllocation={addAllocation}
                                />
                                : <ContributorsEmptyState active/>

                        }
                    </Grid>
                </Box>
                <hr/>
            </Grid>
            <h1>
                {`Add new contributors to the project`}
            </h1>
            {errorGithubContributors
                ? isNotAContributor()
                : null
            }
            <Grid item xs={12}>
                <Box>
                    <Grid container>
                        {
                            contributorsToAdd.length != 0
                                ? <Contributors
                                    contributors={contributorsToAdd}
                                    project={project}
                                    addAllocation={addAllocation}
                                />
                                : <ContributorsEmptyState/>
                        }
                    </Grid>
                </Box>
                <Box my={[2, 5]} py={5}/>
            </Grid>
            <Grid item xs={12}>
                {
                    contributorClicked &&
                    <AllocationAddForm
                        project={project}
                        open={openAddAllocationDialog}
                        onClose={handleAddAllocationClose}
                        contributor={contributorClicked}
                    />
                }
            </Grid>
        </Grid>
    )
}

export default ContributorList
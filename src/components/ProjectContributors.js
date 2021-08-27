import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery, useMutation } from '@apollo/client'
import {
    Box,
    Grid,
    Typography,
    TextField
} from '@material-ui/core/'
import {
    differenceBy
} from 'lodash'

import AllocationAddForm from './AllocationAddForm'
import LoadingProgress from './LoadingProgress'
import ContributorTile from './ContributorTile'
import ContributorsEmptyState from './ContributorsEmptyState'
import GithubAccessBlocked from './GithubAccessBlocked'
import { GET_PROJECT_CONTRIBUTORS } from '../operations/queries/ProjectQueries'
import { GET_CONTRIBUTORS } from '../operations/queries/ContributorQueries'
import { SYNC_PROJECT_GITHUB_CONTRIBUTORS } from '../operations/mutations/ProjectMutations'
import { pageName } from '../reactivities/variables'
import {
    getAllocatedContributors,
    getActiveAndUpcomingAllocations
} from '../scripts/selectors'

const stringMatchName = (string, searchFilter) => {
    return string.name.toLowerCase().includes(searchFilter.toLowerCase())
}

const stringMatchGithub = (string, searchFilter) => {
    return string.github_handle.toLowerCase().includes('https://github.com/'.concat(searchFilter).toLowerCase())
}

const ActiveContributors = ({
    allocations,
    allContributors,
    searchFilter
}) => {
    const activeAllocations = getActiveAndUpcomingAllocations({
        allocations: allocations,
        activeOnly: true
    })
    const activeContributors = getAllocatedContributors({
        allocations: activeAllocations
    })

    const renderActiveContributors = () => {
        console.log('renderActiveContributors')
        const contributors = searchFilter == ''
            ? activeContributors
            : activeContributors.filter(a => {
                return stringMatchName(a, searchFilter) || stringMatchGithub(a, searchFilter)
            })

        return contributors.map(c => {
            return (
                <Grid item xs={12} md={6}>
                    <ContributorTile
                        active
                        contributor={c}
                        onAddButton={addAllocation}
                        project={project}
                    />
                </Grid>
            )
        })
    }

    return (
        <Box my={[2, 5]}>
            <Typography align='left' variant='h5'>
                {`Active contributors`}
            </Typography>
            <Grid container>
                {activeContributors.length != 0
                    ? renderActiveContributors()
                    : <ContributorsEmptyState active/>
                }
            </Grid>
        </Box>
    )
}

const ProjectContributors = (props) => {

    const { projectId } = props

    const [contributors, setContributors] = useState([])
    const [githubContributors, setGithubContributors] = useState([])
    const [openAddAllocationDialog, setOpenAddAllocationDialog] = useState(false)
    const [contributorClicked, setContributorClicked] = useState(null)
    const [searchFilter, setSearchFilter] = useState('')

    const handleAddAllocationClose = (value) => {
        setOpenAddAllocationDialog(false)
    }

    const {
        data: dataProjectContributors,
        loading: loadingProjectContributors,
        error: errorProjectContributors
    } = useQuery(GET_PROJECT_CONTRIBUTORS, {
        variables: {
            id: Number(projectId)
        }
    })

    const {
        data: dataContributors,
        loading: loadingContributors,
        error: errorContributors
    } = useQuery(GET_CONTRIBUTORS)

    const [
        getGithubContributors,
        {
            data: dataGithubContributors,
            loading: loadingGithubContributors,
            error: errorGithubContributors
        }
    ] = useMutation(SYNC_PROJECT_GITHUB_CONTRIBUTORS, {
        onCompleted: dataGithubContributors => {
            setGithubContributors(dataGithubContributors.syncProjectGithubContributors)
        },
        refetchQueries: [{
            query: GET_CONTRIBUTORS
        }],
        errorPolicy: 'all'
    })

    useEffect(() => {
        console.log('useEffect 1')
        getGithubContributors({
            variables: { project_id: Number(projectId) }
        })
    }, [])
 
    useEffect(() => {
        console.log('useEffect 2')
        try {
            if (githubContributors.length) {
                setContributors(contributors.concat(...githubContributors))
            }
        } catch (error) {
            console.log(`error: ${error}`)
        }
    }, [githubContributors])

    if (loadingProjectContributors || loadingContributors || loadingGithubContributors) {
        return <LoadingProgress/>
    }

    const isNotAContributor = () => {
        return (
            <GithubAccessBlocked
                message={`You must have access to this repository on GitHub to see an up-to-date list of collaborators.`}
                projectId={projectId}
            />
        )
    }
    
    if (errorProjectContributors || errorContributors) return `Error!`

    const project = dataProjectContributors.getProjectById

    pageName(project.name)

    const { allocations } = project

    if (differenceBy(dataContributors.getContributors, contributors, 'id').length != 0) {
        setContributors(contributors.concat(...dataContributors.getContributors))
    }

    const addAllocation = (props) => {
        setOpenAddAllocationDialog(true)
        setContributorClicked(props.contributor)
    }

    const activeAllocations = getActiveAndUpcomingAllocations({
        allocations: allocations,
        activeOnly: true
    })
    const upcomingAllocations = getActiveAndUpcomingAllocations({
        allocations: allocations,
        upcomingOnly: true
    })

    const getActiveContributors = () => {
        const activeContributorsAllocated = getAllocatedContributors({
            allocations: activeAllocations
        })

        if (searchFilter == '') {
            return activeContributorsAllocated
        } else {
            return activeContributorsAllocated.filter(a => {
                return stringMatchName(a, searchFilter) || stringMatchGithub(a, searchFilter)
            })
        }
    }
    const activeContributors = getActiveContributors()

    const getUpcomingContributors = () => {
        const upcomingContributorsAllocatedOnly = differenceBy(
            getAllocatedContributors({ allocations: upcomingAllocations }),
            activeContributors,
            'id'
        )

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
        const contributorsToAdd = differenceBy(
            contributors,
            [...activeContributors, ...upcomingContributors],
            'id'
        )

        if (searchFilter == '') {
            return contributorsToAdd
        } else {
            return contributorsToAdd.filter(a => {
                return stringMatchName(a, searchFilter) || stringMatchGithub(a)
            })
        }
    }
    const contributorsToAdd = getContributorsToAdd()


    const renderUpcomingContributors = () => {
        console.log('renderUpcomingContributors')
        return upcomingContributors.map(c => {
            return (
                <Grid item xs={12} md={6}>
                    <ContributorTile
                        active
                        contributor={c}
                        onAddButton={addAllocation}
                        project={project}
                    />
                </Grid>
            )
        })
    }

    const renderContributorsToAdd = () => {
        console.log('renderContributorsToAdd')
        return contributorsToAdd.map(c => {
            return (
                <Grid item xs={12} md={6}>
                    <ContributorTile
                        active={false}
                        contributor={c}
                        onAddButton={addAllocation}
                        project={project}
                    />
                </Grid>
            )
        })
    }

    console.log('render')
    console.log('searchFilter')
    console.log(searchFilter)

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
                    {`${activeContributors.length} active ${activeContributors.length == 1
                        ? 'contributor'
                        : 'contributors'
                    }`}
                </Box>
            </Grid>
            <Grid xs={12}/>
            <Grid item xs={12} sm={5}>
                <TextField
                    placeholder='Search contributors...' 
                    onChange={(event) => {
                        console.log(event.target.value)
                        // setSearchFilter(event.target.value)
                    }}
                    // value={searchFilter}
                    fullWidth
                    color='primary'
                    variant='outlined'
                    type='search'
                />
            </Grid>
            <Grid item xs={12}>
                <ActiveContributors
                    allocations={allocations}
                    allContributors={contributors}
                    searchFilter={searchFilter}
                />
                
                <Box my={[2, 5]}>
                    <Typography align='left' variant='h5'>
                        {`Upcoming contributors`}
                    </Typography>
                    <Grid container>
                        {upcomingContributors.length != 0
                            ? renderUpcomingContributors()
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
                        {contributorsToAdd.length != 0
                            ? renderContributorsToAdd()
                            : <ContributorsEmptyState/>
                        }
                    </Grid>
                </Box>
                <Box my={[2, 5]} py={5}/>
            </Grid>
            <Grid item xs={12}>
                {contributorClicked &&
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

export default ProjectContributors

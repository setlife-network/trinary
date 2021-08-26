import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery, useMutation } from '@apollo/client'
import {
    Box,
    Grid,
    Typography,
    TextField
} from '@material-ui/core/'
import SearchIcon from '@material-ui/icons/Search'
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
        getGithubContributors({
            variables: { project_id: Number(projectId) }
        })
    }, [])
 
    useEffect(() => {
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

    const activeAllocations = getActiveAndUpcomingAllocations({
        allocations: allocations,
        activeOnly: true
    })

    const activeContributorsAllocated = getAllocatedContributors({
        allocations: activeAllocations
    })

    const upcomingAllocations = getActiveAndUpcomingAllocations({
        allocations: allocations,
        upcomingOnly: true
    })

    const upcomingContributorsAllocatedOnly = differenceBy(
        getAllocatedContributors({ allocations: upcomingAllocations }),
        activeContributorsAllocated,
        'id'
    )

    if (differenceBy(dataContributors.getContributors, contributors, 'id').length != 0) {
        setContributors(contributors.concat(...dataContributors.getContributors))
    }

    const stringMatch = (string) => {
        return string.name.toLowerCase().includes(searchFilter.toLowerCase())
    }

    const getActiveContributors = () => {
        if (searchFilter == '') {
            return activeContributorsAllocated
        } else {
            return activeContributorsAllocated.filter(a => {
                return stringMatch(a)
            })
        }
    }
    const activeContributors = getActiveContributors()

    const getUpcomingContributors = () => {
        if (searchFilter == '') {
            return upcomingContributorsAllocatedOnly
        } else {
            return upcomingContributorsAllocatedOnly.filter(u => {
                return stringMatch(u)
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
                return stringMatch(a)
            })
        }
    }
    const contributorsToAdd = getContributorsToAdd()

    const addAllocation = (props) => {
        setOpenAddAllocationDialog(true)
        setContributorClicked(props.contributor)
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
                        `${activeContributorsAllocated.length} active ${activeContributorsAllocated.length == 1
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
                >
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <Box my={[2, 5]}>
                    <Typography align='left' variant='h5'>
                        {`Active contributors`}
                    </Typography>
                    <Grid container>
                        {
                            activeContributors.length != 0
                                ? renderContributors({
                                    active: true,
                                    contributors: activeContributors,
                                    project: project
                                })
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
                                ? renderContributors({
                                    active: true,
                                    contributors: upcomingContributors,
                                    project: project
                                })
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
                                ? renderContributors({
                                    active: false,
                                    contributors: contributorsToAdd,
                                    project: project
                                })
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

export default ProjectContributors

import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery, useMutation } from '@apollo/client'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core/'
import {
    differenceBy,
    filter
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

    const addAllocation = (props) => {
        setOpenAddAllocationDialog(true)
        setContributorClicked(props.contributor)
    }

    if (loadingProjectContributors || loadingContributors || loadingGithubContributors) {
        return <LoadingProgress/>
    }
    if (errorGithubContributors) {
        return (
            <GithubAccessBlocked
                message={`You must be a Github collaborator to access this metrics`} //Expected message
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

    const contributorsToAdd = differenceBy(contributors, [...activeContributorsAllocated, ...upcomingContributorsAllocatedOnly], 'id')

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
                >
                    {
                        `${activeContributorsAllocated.length} active ${activeContributorsAllocated.length == 1
                            ? 'contributor'
                            : 'contributors'
                        }`
                    }
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box my={[2, 5]}>
                    <Typography align='left' variant='h5'>
                        {`Active contributors`}
                    </Typography>
                    <Grid container>
                        {
                            activeContributorsAllocated.length != 0
                                ? renderContributors({
                                    active: true,
                                    contributors: activeContributorsAllocated,
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
                            upcomingContributorsAllocatedOnly.length != 0
                                ? renderContributors({
                                    active: true,
                                    contributors: upcomingContributorsAllocatedOnly,
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

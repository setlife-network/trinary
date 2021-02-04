import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery, useMutation } from '@apollo/client'
import {
    Box,
    Grid
} from '@material-ui/core/'
import {
    differenceBy,
    filter
} from 'lodash'
import moment from 'moment'

import AllocationAddForm from './AllocationAddForm'
import LoadingProgress from './LoadingProgress'
import ContributorTile from './ContributorTile'
import ContributorsEmptyState from './ContributorsEmptyState'
import GithubAccessBlocked from './GithubAccessBlocked'
import { GET_PROJECT_CONTRIBUTORS } from '../operations/queries/ProjectQueries'
import { GET_CONTRIBUTORS } from '../operations/queries/ContributorQueries'
import { SYNC_PROJECT_GITHUB_CONTRIBUTORS } from '../operations/mutations/ProjectMutations'

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
        if (githubContributors.length) {
            setContributors(contributors.concat(...githubContributors))
        }
    }, [githubContributors])

    const addAllocation = (props) => {
        setOpenAddAllocationDialog(true)
        setContributorClicked(props.contributor)
    }

    const selectActiveAllocations = (allocation) => {
        return moment(allocation['start_date'], 'x').isBefore(moment()) && moment(allocation['end_date'], 'x').isAfter(moment())
    }

    if (loadingProjectContributors || loadingContributors || loadingGithubContributors) {
        return <LoadingProgress/>
    }
    if (errorGithubContributors) {
        return (
            <GithubAccessBlocked
                message={`You must be a Github collaborator to access this metrics`}
            />
        )
    }
    if (errorProjectContributors || errorContributors) return `Error!`

    const project = dataProjectContributors.getProjectById
    const { allocations } = project
    const activeAllocations = filter(allocations, (allocation) => selectActiveAllocations(allocation))
    const activeContributors = activeAllocations.map(a => {
        return a.contributor
    })

    if (differenceBy(dataContributors.getContributors, contributors, 'id').length != 0) {
        setContributors(contributors.concat(...dataContributors.getContributors))
    }
    const contributorsToAdd = differenceBy(contributors, activeContributors, 'id')

    const renderContributors = (active, contributors) => {
        return contributors.map(c => {
            return (
                <Grid item xs={12} md={6}>
                    <ContributorTile
                        active={active}
                        contributor={c}
                        onAddButton={addAllocation}
                    />
                </Grid>
            )
        })
    }

    return (
        <Grid container className='ProjectContributors'>
            <h1>{`${project.name} Contributors`}</h1>
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
                        `${activeContributors.length} active ${activeContributors.length == 1
                            ? 'contributor'
                            : 'contributors'
                        }`
                    }
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box my={5}>
                    <Grid container>
                        {
                            activeContributors.length != 0
                                ? renderContributors(true, activeContributors)
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
                                ? renderContributors(false, contributorsToAdd)
                                : <ContributorsEmptyState/>
                        }
                    </Grid>
                </Box>
                <Box my={5} py={5}/>
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

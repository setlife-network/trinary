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
import ContributorList from './ContributorList'
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

    const upcomingContributorsAllocatedOnly = differenceBy(
        getAllocatedContributors({ allocations: upcomingAllocations }),
        activeContributorsAllocated,
        'id'
    )

    if (differenceBy(dataContributors.getContributors, contributors, 'id').length != 0) {
        setContributors(contributors.concat(...dataContributors.getContributors))
    }

    return (
        <ContributorList 
            contributors={contributors}
            project={project}
            activeContributorsAllocated={activeContributorsAllocated}
            upcomingContributorsAllocatedOnly={upcomingContributorsAllocatedOnly}
            errorGithubContributors={errorGithubContributors}
            isNotAContributor={isNotAContributor}
        />
    )
}

export default ProjectContributors

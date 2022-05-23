import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import {
    Backdrop,
    Box,
    CircularProgress,
    Grid,
    Typography
} from '@material-ui/core'

import { GET_PROJECT, GET_PROJECT_TIME_ENTRIES } from '../operations/queries/ProjectQueries'
import { CHECK_SESSION } from '../operations/queries/ContributorQueries'
import GithubAccessBlocked from './GithubAccessBlocked'
import LoadingProgress from './LoadingProgress'
import ProjectSummary from './ProjectSummary'
import ProjectOverviewExternalLinks from './ProjectOverviewExternalLinks'
import ProjectTimeTracking from './ProjectTimeTracking'
import { pageName } from '../reactivities/variables'

const ProjectOverview = (props) => {

    const { projectId } = props

    const {
        data: dataTimeEntries,
        loading: loadingTimeEntries,
        error: errorTimeEntries
    } = useQuery(GET_PROJECT_TIME_ENTRIES, {
        variables: {
            id: Number(projectId)
        }
    })

    const {
        data: dataProject,
        loading: loadingProject,
        error: errorProject,
    } = useQuery(GET_PROJECT, {
        variables: {
            id: Number(projectId)
        }
    })

    if (loadingProject || loadingTimeEntries) return <LoadingProgress/>
    if (errorTimeEntries || errorProject) return 'Error..'

    const project = dataProject.getProjectById
    pageName(project.name)
    const {
        id,
        timeEntries,
        timeSpent,
        timeSpentPerContributor
    } = dataTimeEntries.getProjectById

    return (
        <Grid
            container
            className='ProjectOverview'
            justifyContent='center'
        >
            <Grid item xs={12}>
                <Box pb={3}>
                    <Typography variant='h4' align='center'>
                        <strong>
                            {'Overview'}
                        </strong>
                    </Typography>
                </Box>
                <ProjectSummary project={project}/>
                <ProjectOverviewExternalLinks
                    github_url={project.github_url}
                    toggl_url={project.toggl_url}
                />
                <Box mt={[4, 8]}>
                    <ProjectTimeTracking
                        projectId={id}
                        timeEntries={timeEntries}
                        timeSpent={timeSpent}
                        timeSpentPerContributor={timeSpentPerContributor}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}

export default ProjectOverview;

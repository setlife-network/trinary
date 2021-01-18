import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

import { GET_PROJECT, GET_PROJECT_TIME_ENTRIES } from '../operations/queries/ProjectQueries'
import { CHECK_SESSION } from '../operations/queries/ContributorQueries'
import GithubAccessBlocked from './GithubAccessBlocked'
import ProjectSummary from './ProjectSummary'
import ProjectOverviewExternalLinks from './ProjectOverviewExternalLinks'
import ProjectTimeTracking from './ProjectTimeTracking'

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

    if (loadingProject || loadingTimeEntries) return 'Loading...'
    if (errorTimeEntries || errorProject) return 'Error..'

    const project = dataProject.getProjectById
    const {
        timeEntries,
        timeSpent,
        timeSpentPerContributor
    } = dataTimeEntries.getProjectById

    return (
        <Grid
            container
            className='ProjectOverview'
            justify='center'
        >
            <Grid item xs={10} lg={5}>
                <Box p={3}>
                    <Typography variant='h4'>
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
                <Box mt={8}>
                    <ProjectTimeTracking
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

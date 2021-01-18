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

const TimeTracking = ({
    totalTimeSpent,
    timeSpent
}) => {
    return (
        <div className='TimeTracking'>
            TimeTracking
        </div>
    )
}

const ProjectOverview = (props) => {

    const { projectId } = props

    const {
        data: timeEntriesData,
        loading: timeEntriesLoading,
        error: timeEntriesError
    } = useQuery(GET_PROJECT_TIME_ENTRIES, {
        variables: {
            id: Number(projectId)
        }
    })

    const {
        data: projectData,
        loading: projectLoading,
        error: projectError
    } = useQuery(GET_PROJECT, {
        variables: {
            id: Number(projectId)
        },
        errorPolicy: 'all'
    })

    if (projectLoading || timeEntriesLoading) return 'Loading...'
    // if (timeEntriesError || projectError) return 'Error..'

    const project = projectData.getProjectById

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
                    <ProjectTimeTracking project={project}/>
                </Box>
            </Grid>
        </Grid>
    )
}

export default ProjectOverview;

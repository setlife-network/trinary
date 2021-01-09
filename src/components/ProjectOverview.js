import React, { useState } from 'react';
import { useQuery } from '@apollo/client'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

import { GET_PROJECT } from '../operations/queries/ProjectQueries'
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

    const { data, loading, error } = useQuery(GET_PROJECT, {
        variables: {
            id: Number(projectId)
        }
    })

    if (loading) return 'Loading...'
    if (error) return error

    const project = data.getProjectById

    return (
        <Grid container className='ProjectOverview' justify='center'>
            <Grid item xs={12}>
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

ProjectOverview.defaultProps = {

};

export default ProjectOverview;

import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import {
    Box,
    Button,
    Grid,
    Typography
} from '@material-ui/core'

import { GET_PROJECT } from '../operations/queries/ProjectQueries'
import ProjectSummary from './ProjectSummary'
import ProjectOverviewExternalLinks from './ProjectOverviewExternalLinks'

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

    const project = data?.getProjectById

    console.log('project');
    console.log(project);

    return (
        <Grid container className='ProjectOverview' justify='center'>
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
            </Grid>

            {
                //<TimeTracking project={project}/>
            }
        </Grid>
    );
}

ProjectOverview.defaultProps = {

};

export default ProjectOverview;

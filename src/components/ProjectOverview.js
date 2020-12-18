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
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Box mt={2} mr={{ xs: 0, sm: 1 }}>
                            <Button
                                fullWidth
                                variant='outlined'
                                color='primary'
                                disabled={project.github_url ? 0 : 1}
                                onClick={() => window.open(project.github_url, '_blank')}
                            >
                                <Typography variant='h6'>
                                    {`Check Github profile`}
                                </Typography>
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Box mt={2} ml={{ xs: 0, sm: 1 }}>
                            <Button
                                fullWidth
                                variant='outlined'
                                color='primary'
                                disabled={project.github_url ? 0 : 1}
                                onClick={() => window.open(project.toggl_url, '_blank')}
                            >
                                <Typography variant='h6'>
                                    {`Check Toggl profile`}
                                </Typography>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
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

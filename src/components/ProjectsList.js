import React from 'react'
import { useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid'
import { orderBy } from 'lodash'

import ProjectTile from './ProjectTile'
import LoadingProgress from './LoadingProgress'
import { GET_ACTIVE_PROJECTS } from '../operations/queries/ProjectQueries';

const ProjectsList = ({
    history
}) => {

    const { 
        loading: loadingActiveProject,
        error: errorActiveProject, 
        data: dataActiveProject 
    } = useQuery(GET_ACTIVE_PROJECTS, {
        fetchPolicy: 'cache-and-network'
    });

    if (loadingActiveProject) return <LoadingProgress />
    if (errorActiveProject) return `Error! ${errorActiveProject.message}`;
    const projects = orderBy(dataActiveProject.getActiveProjects, 'is_active', 'desc')

    return (
        projects.map(p => {
            return (
                <Grid item xs={12} sm={6} lg={4} className='ProjectsList'>
                    <ProjectTile
                        project={p}
                        history={history}
                    />
                </Grid>
            )
        })
    )
}

export default ProjectsList

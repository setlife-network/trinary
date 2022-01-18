import React from 'react'
import Grid from '@material-ui/core/Grid'

import ProjectTile from './ProjectTile'

const ProjectsList = ({
    history,
    projects
}) => {

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

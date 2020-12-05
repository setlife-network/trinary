import React from 'react'
import Grid from '@material-ui/core/Grid'

import HomeProjectsListManager from '../components/HomeProjectsListManager'
import ProjectsListManager from '../components/ProjectsListManager'
import ProjectsList from '../components/ProjectsList'

class ProjectsListPage extends React.Component {

    render() {
        return (
            <Grid
                container
                direction='row'
                justify='center'
                className='ProjectsListPage'
            >
                <Grid item xs={12}>
                    <ProjectsListManager
                        history={this.props.history}
                        home
                    />
                    <Grid container>
                        <HomeProjectsListManager
                            history={this.props.history}
                        />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default ProjectsListPage

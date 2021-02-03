import React from 'react'
import { Grid } from '@material-ui/core'

import HomeProjects from '../components/HomeProjects'
import ProjectsListManager from '../components/ProjectsListManager'
import ProjectsList from '../components/ProjectsList'
import { pageName } from '../reactivities/variables'

class ProjectsListPage extends React.Component {

    render() {
        const { history } = this.props
        pageName('Projects')
        return (
            <Grid
                container
                justify='center'
                className='ProjectsListPage'
            >
                <Grid item xs={12}>
                    <ProjectsListManager
                        history={history}
                        home
                    />
                    <Grid container>
                        <HomeProjects
                            history={history}
                        />
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default ProjectsListPage

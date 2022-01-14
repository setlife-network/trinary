import React from 'react'
import { Grid } from '@material-ui/core'

import HomeProjects from '../components/HomeProjects'
import ProjectsListManager from '../components/ProjectsListManager'
import InactiveProjects from '../components/InactiveProjects'

class ProjectsListPage extends React.Component {

    render() {
        const { history } = this.props
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
                    <InactiveProjects 
                        history={history}
                        home
                    />
                </Grid>
            </Grid>
        )
    }
}

export default ProjectsListPage

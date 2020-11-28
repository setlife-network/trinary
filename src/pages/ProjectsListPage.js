import React from 'react'
import Grid from '@material-ui/core/Grid'

//import ClientsListManager from '../components/ClientsListManager'
import ProjectsList from '../components/ProjectsList'

class ClientListPage extends React.Component {

    render() {
        return (
            <div className='ProjectsListPage'>
                <Grid container direction='row' justify='center'>
                    <Grid item xs={10}>
                        <Grid container>
                            <ProjectsList
                                history={this.props.history}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default ClientListPage

import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import AddProjectForm from '../components/AddProjectForm'
import Header from '../components/Header'
import { pageName } from '../reactivities/variables'

class AddProjectPage extends React.Component {

    render() {

        const { clientId } = this.props.match.params
        pageName('Add Project')
        return (
            <Grid
                container
                justify='center'
                className='AddProjectPage'
            >
                {// <Header
                //     title='Add Project'
                //     direction='row'
                //     justify='center'
                //     alignItems='center'
                // />
                }
                <Grid item align='center' xs={8}>
                    <Typography align='left'>
                        <strong>
                            {`Enter info below to create a project`}
                        </strong>
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Box item mt={5}>
                        <AddProjectForm
                            clientId={clientId}
                            history={this.props.history}
                        />
                    </Box>
                </Grid>
            </Grid>
        )
    }
}

export default AddProjectPage

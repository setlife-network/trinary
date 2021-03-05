import React from 'react'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import AddProjectForm from '../components/AddProjectForm'

class AddProjectPage extends React.Component {

    render() {

        const { clientId } = this.props.match.params
        return (
            <Grid
                container
                justify='center'
                className='AddProjectPage'
            >
                <Grid item align='center' xs={8}>
                    <Typography align='left' variant={'h6'} color='primary'>
                        <strong>
                            {`Enter info below to create a project`}
                        </strong>
                    </Typography>
                </Grid>
                <Grid item xs={8}>
                    <Box my={3}>

                        <AddProjectForm
                            clientId={clientId}
                        />
                    </Box>
                </Grid>
            </Grid>
        )
    }
}

export default AddProjectPage

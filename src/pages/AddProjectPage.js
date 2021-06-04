import React from 'react'
import {
    Box,
    Grid,
    Typography
} from '@material-ui/core'

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
                <Grid item align='center' xs={10}>
                    <Typography align='left' variant={'h5'} color='primary'>
                        <strong>
                            {`Enter info below to create a project`}
                        </strong>
                    </Typography>
                </Grid>
                <Grid item xs={10}>
                    <Box mt={3} mb={5}>
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
